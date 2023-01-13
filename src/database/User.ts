import * as Mongo from "mongoose";

const Schema = new Mongo.Schema({
    // O nome do usuário/jogador.
    name: {
        type: "string",
        required: true
    },

    // O "sessionID" do usuário.
    uid: {
        type: "number",
        required: true
    }
});

export default Mongo.model("User", Schema);