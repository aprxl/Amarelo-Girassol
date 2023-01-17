import SocketServer from "../SocketManager.js";
import Event from "../Event.js";

export default class Tick extends Event {
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

      console.log( `Tick event (${date.toISOString( )}).` );

      server.sockets.emit(this.name, {
         date: date,
         data: { }
      });
   }
};