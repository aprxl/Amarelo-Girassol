import * as Mongo from "mongoose";

const Schema = new Mongo.Schema({
    // O nome da sala especificado pelo usuário.
    name: {
        type: "string",
        required: true,
        default: "Lobby"
    },

    // O indentificador dessa sala. Não confundir com indentificador único gerado pelo MongoDB.
    id: {
        type: "number",
        required: true
    },

    // A capacidade total de jogadores da sala.
    capacity: {
        type: "number",
        required: true,
        default: 8
    },

    // A quantidade atual de jogadores na sala.
    current_capacity: {
        type: "number",
        default: 0
    },

    // A informação de todos os jogadores conectados.
    players: {
        type: [Mongo.SchemaTypes.ObjectId],
        ref: "User",
        default: []
    }

}, { strict: true, strictQuery: false });

export default Mongo.model("Lobbies", Schema);