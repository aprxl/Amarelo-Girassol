import { Socket } from "socket.io";
import SocketEvent from "../Event.js";
import Packet from "../packets/CursorPositionPacket.js";

interface VectorMap {
   [key: string]: Packet;
}

class CursorPositionClient extends SocketEvent {
   public readonly name = 'cursor_position_client';

   public callback( io: Socket ): void {
      io.emit(this.name, {
         date: new Date().toISOString( ),
         vectors: CursorPosition.getAll( )
      });
   }
}

class CursorPosition extends SocketEvent {
   public readonly name = 'cursor_position'  

   private static positions: VectorMap = { };

   public static getCursorPosition(socketId: string): Vector2 {
      return CursorPosition.positions[socketId]?.data.x ?? { x: 0, y: 0 };
   }

   public static getAll(): VectorMap {
      return CursorPosition.positions;
   }

   public static resetAll(): void {
      CursorPosition.positions = { };
   }

   public callback( socket: Socket, packet: Packet ): void {
      const data = packet.data;
      const date = new Date(packet.date);

      if (!data || !date) {
         return;
      }

      socket.emit(this.name, {
         date: new Date().toISOString( ),
         vectors: CursorPosition.getAll( )
      });

      if ( date < ( new Date(CursorPosition.positions[socket.id]?.date) ?? new Date( ) ) ) {
         return;
      }

      CursorPosition.positions[socket.id] = {
         data: { x: data.x, y: data.y },
         date: date
      };
   }
}

export {
   CursorPositionClient,
   CursorPosition
};