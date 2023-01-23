import Packet from "../Packet.js";

interface Vector2 {
   x: number;
   y: number;
};

export default interface CursorPositionPacket extends Packet<Vector2> { };