import { Socket } from "socket.io";
import SocketEvent from "../Event.js";
import SocketServer from "../SocketManager.js";

export default class Tick extends SocketEvent {
   public readonly name = 'tick';

   public constructor(
      private readonly manager: SocketServer
   ) {
      super( );

      setInterval(this.callback.bind(this), 
         this.manager.getTickrate( ) * 1000);
   }

   public callback( io: Socket ): void {
      const server = this.manager.getServer( );

      server.emit('tick', {
         raw: "",
         date: new Date()
      });
   }
}