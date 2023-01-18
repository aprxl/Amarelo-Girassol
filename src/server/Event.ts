import type { Socket } from "socket.io";

// A classe abstrata responsável por definir
// o corpo de um evento do Socket.io
export default abstract class SocketEvent {
   public abstract readonly name: string;
   public abstract callback( socket?: Socket, ...args: any[ ] ): void;
};