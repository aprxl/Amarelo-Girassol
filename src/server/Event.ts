import { Socket } from "socket.io";

// o corpo de um evento do Socket.io
export default abstract class SocketEvent {
   public abstract readonly name: string;
   public abstract callback( io: Socket, ...args: any[ ] ): void;
};