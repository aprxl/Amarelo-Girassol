import type { Socket } from "socket.io";
import Event from "../Event.js"

export default class Connect extends Event {
   public readonly name = "connect";

   public callback( socket: Socket ): void {
      console.log(`A client (${socket.id}) has connected.`);

      socket.on('disconnect', () => {
         socket.send("Goodbye!");
      })
   }
};