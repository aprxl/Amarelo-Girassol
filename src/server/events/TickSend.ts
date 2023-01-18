import SocketServer from "../SocketManager.js";
import Event from "../Event.js";

interface Response {
   id: string,
   message: string
};

// O evento cujo mantém a constante transmissão de dados
// entre o servidor e cliente.
export default class TickSend extends Event {
   public readonly name = "tick";
   
   public constructor(
      private readonly manager: SocketServer
   ) {
      super();

      setInterval(this.callback.bind(this), 
         this.manager.getTickrate( ) * 1000);
   }

   public callback(): void {
      const server = this.manager.getServer( );
      const date = new Date( );

      // Emita um broadcast para todos os clientes.
      server.sockets.timeout(10000).emit(this.name, {
         date: date,
         data: { }
      });
   }
};