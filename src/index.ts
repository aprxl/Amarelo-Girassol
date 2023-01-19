/// 
/// Projeto final de Desenvolvimento de Software - "Feudo"
/// Grupo Amarelo Girassol
/// Semestre 2, 2022
/// Universidade de Brasília, Campus do Gama
///

import * as Mongo from "mongoose";

import RouteManager from "./routes/RouteManager.js";
import Main from "./routes/Main.js";
import Lobby from "./routes/Lobby.js";

import Lobbies from "./database/Lobbies.js";

import SocketManager from "./server/SocketManager.js";
import Ping from "./server/events/Ping.js";
import Tick from "./server/events/Tick.js";

/**
 * A função principal do projeto.
 * @returns {void}
 */
async function run( ) {
   const routeManager = new RouteManager( );
   const socketManager = new SocketManager( );

   // Configure o banco de dados.
   Mongo.connect("mongodb://127.0.0.1:27017/db");
   Mongo.set("strictQuery", true);

   console.log("MongoDB server successfully connected.");

   // Resete o banco de dados, pois sempre que o servidor reiniciar, queremos resetar
   // a lista de salas disponíveis.
   await Lobbies.deleteMany();

   // Adicione os caminhos da API REST.
   routeManager.addRouter( Main, "/" );
   routeManager.addRouter( Lobby, "/lobbies" );

   // Adicione os diferentes eventos do servidor.
   socketManager.addSocketEvent( new Ping( ) );
   socketManager.addServerEvent( new Tick( socketManager ) );
}

// Execute o código.
run( );
