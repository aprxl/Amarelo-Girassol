import { Server } from "socket.io";
import SocketEvent from "./Event.js";

type Callback = () => void;

class SocketServer {
  private readonly server: Server;

  public constructor(
    private port: number = 3001,
    private tickrate: number = 1 / 4 
  ) {
    this.server = new Server(this.port);
  }

  public on(
    eventName: string,
    callback: Callback
  ) {
    this.server.on(eventName, callback);
  }

  public addEvent(
    event: SocketEvent
  ) {
    this.on( event.name, event.callback );
  }

  public getServer(): Server {
    return this.server;
  }

  public getPort(): number {
    return this.port;
  }

  public getTickrate(): number {
    return this.tickrate;
  }
}

export default SocketServer;
