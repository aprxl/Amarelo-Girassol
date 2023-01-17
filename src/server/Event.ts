import type { Socket } from "socket.io";

export default abstract class SocketEvent {
   public abstract readonly name: string;
   public abstract callback( socket?: Socket ): void;
};