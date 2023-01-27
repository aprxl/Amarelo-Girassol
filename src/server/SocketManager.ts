import { Server, Socket } from "socket.io";
import SocketEvent from "./Event.js";
import Http from "http";

type Callback = (...args: any[ ]) => void;

// Classe responsável pela organização e o
// registro de eventos do Socket.io
class SocketServer {
  private readonly server: Server;
  private socketEvents: SocketEvent[ ] = [ ];

  public constructor(
    private httpServer: Http.Server,
    private port: number = 3000,
    private tickrate: number = 1 / 2
  ) {
    this.server = new Server(this.httpServer, {
      cors: {
        "credentials": false
      }
    });

    this.on('connect', (socket: Socket) => {
      console.log(`A client has connected. (${socket.id})`);

      for (const event of this.socketEvents) {
        socket.on(event.name, (...args: any[]) => {
          event.callback(socket, ...args);
        });
      }

      socket.on('disconnect', () => {
        console.log(`A client has disconnected. (${socket.id})`);

        for (const event of this.socketEvents) {
          if (event.destroy)
            event.destroy(socket);
        }
      })
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

  /**
   * Adiciona um novo listener de eventos (classe).
   * @param event SocketEvent
   */
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
