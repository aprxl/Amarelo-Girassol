import type { Socket } from "socket.io";
import Event from "../Event.js"

// O evento principal do Socket.io que é disparado
// quando um novo cliente se conecta ao servidor.
export default class Connect extends Event {
   public readonly name = "connect";

   public callback( socket: Socket ): void {
      console.log(`A client (${socket.id}) has connected.`);

      socket.on('tick_receive', (date: number) => {
         const diff = new Date().getTime() - date;
         console.log(`[${socket.id}] ${Math.round(diff)}ms`);
      })

      socket.on('disconnect', () => {
         socket.send("Goodbye!");
      })
   }
};