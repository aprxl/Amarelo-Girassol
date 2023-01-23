import { Socket } from "socket.io";
import SocketEvent from "../Event.js";

interface Vector2 {
   x: number;
   y: number;
}

interface Packet {
   position: Vector2;
   date: Date;
}

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
      return CursorPosition.positions[socketId]?.position ?? { x: 0, y: 0 };
   }

   public static getAll(): VectorMap {
      return CursorPosition.positions;
   }

   public static resetAll(): void {
      CursorPosition.positions = { };
   }

   public callback( socket: Socket, data: Packet ): void {
      const date = new Date(data.date);

      socket.emit(this.name, {
         date: new Date().toISOString( ),
         vectors: CursorPosition.getAll( )
      });

      if ( date < ( new Date(CursorPosition.positions[socket.id]?.date) ?? new Date( ) ) ) {
         return;
      }

      console.log(`Updated ${socket.id} (${JSON.stringify(data.position)})`);

      CursorPosition.positions[socket.id] = {
         position: { x: data.position.x, y: data.position.y },
         date: date
      };
   }
}

export {
   CursorPositionClient,
   CursorPosition
};