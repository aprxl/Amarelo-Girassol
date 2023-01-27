import { Socket } from "socket.io";

interface SocketEvent {
   destroy?( io: Socket ): void;
}

// o corpo de um evento do Socket.io
abstract class SocketEvent {
   public abstract readonly name: string;
   public abstract callback( io: Socket, ...args: any[ ] ): void;
};

export default SocketEvent;