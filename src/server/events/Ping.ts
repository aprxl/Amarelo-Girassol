import { Socket } from "socket.io";
import SocketEvent from "../Event.js";

export default class Ping extends SocketEvent {
   public readonly name = 'ping';

   public callback( io: Socket, socketId: string ): void {
      console.log(`Ping from ${socketId}.`);

      io.emit('pong', "Pong!");
   }
}