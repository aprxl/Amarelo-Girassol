import { Server, Socket } from "socket.io";
import SocketEvent from "./Event.js";

type Callback = (...args: any[ ]) => void;

// Classe responsável pela organização e o
// registro de eventos do Socket.io
class SocketServer {
  private readonly server: Server;
  private socketEvents: SocketEvent[ ] = [ ];

  public constructor(
    private port: number = 3001,
    private tickrate: number = 1 / 2 
  ) {
    this.server = new Server(this.port);

    this.on('connect', (socket: Socket) => {
      for (const event of this.socketEvents) {
        socket.on(event.name, (...args: any[]) => {
          event.callback(socket, ...args);
        });
      }
    });
  }

  /**
   * Adiciona um novo listener de eventos.
   * @param eventName string
   * @param callback Callback
   */
  public on(
    eventName: string,
    callback: Callback
  ) {
    this.server.on(eventName, callback);
  }

  /**
   * Adiciona um novo listener de eventos (classe).
   * @param event SocketEvent
   */
  public addSocketEvent(
    event: SocketEvent
  ) {
    this.socketEvents.push(event);
  }

  public addServerEvent(
    event: SocketEvent
  ) {
    this.on(event.name, event.callback);
  }

  /**
   * Retorna a instância do Socket.io
   * @returns Server
   */
  public getServer(): Server {
    return this.server;
  }

  /**
   * Retorna a porta do servidor Socket.io
   * @returns number
   */
  public getPort(): number {
    return this.port;
  }

  /**
   * Retorna a frequência com qual o servidor e cliente trocam informações.
   * @returns number
   */
  public getTickrate(): number {
    return this.tickrate;
  }
}

export default SocketServer;
