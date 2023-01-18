import { Socket } from "socket.io";
import Event from "../Event.js";

// O evento responsável por validar e confirmar as
// informações recebidas pelos clientes.
export default class TickReceive extends Event {
    public readonly name = "tick_receive";

    public callback( socket: Socket ): void {
        console.log(`Received from ${socket.id}`);
    }
};