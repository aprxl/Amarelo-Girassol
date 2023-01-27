import { Router } from "express";
import Lobbies from "../database/Lobbies.js";
import User from "../database/User.js";

const router = Router();

// Variável por manter o indentificador de cada sala, de forma crescente.
// TODO: Pessima implementação!!
let currentLobbyId = 0;

/**
 * Responsável por retornar todos as salas disponíveis ao usuário.
 * @url "/lobbies/"
 */
router.get("/", async ( request, response ) => {
    // Ache todos os lobbies e retorne-os para o cliente.
    Lobbies.find({}, (err, result) => {
        if (err) {
            response.status(500).send({ error: "Unable to fetch lobby information (internal error)." });
        }

        else {
            response.status(200).send(result);
        }
    })
});

/**
 * Responsável por adicionar/criar uma nova sala.
 * @url "/lobbies/"
 */
router.post("/", async ( request, response ) => {
    const body = request.body;

    // Caso o nome de sala especificado já exista, retorne um erro.
    if (await Lobbies.find({ name: body.name }).count( ) > 0) {
        response.status(500).send({ error: "Lobby with this name already exists." });
    }

    else {
        // Crie uma nova sala com o nome e capacidade especificados e adicione-a ao banco de dados.
        Lobbies.create({ name: body.name, capacity: body.capacity || 2, id: currentLobbyId + 1}, (err, result) => {
            if (err) {
                response.status(500).send({ error: "Unable to create the lobby (internal error)." });
            } 
            
            else {
                response.status(200).send(result);

                // Não esqueça de incrementar o indetificador do lobby.
                currentLobbyId++;
            }
        });
    }
});

/**
 * Reponsável por retornar as informações sobre uma sala pré-existente.
 * @url "/lobbies/:name"
 */
router.get("/:name", async ( request, response ) => {
    Lobbies.findOne({ name: request.params.name }, (err, result) => {
        if (err) {
            response.status(500).send({ error: "Unable to search for lobby (internal error)." });
        }

        // Caso não exista um lobby com este nome.
        else if (result == undefined) {
            response.status(500).send({ error: "Unable to find a lobby with such name." });
        }

        else {
            response.status(200).send(result);
        }
    });
});

router.post("/:name", async ( request, response ) => {
    Lobbies.findOne({ name: request.params.name }, (err, result) => {
        if (err) {
            response.status(500).send({ error: "Unable to search for lobby (internal error)." });
        }

        // Caso não exista um lobby com este nome.
        else if (result == undefined) {
            response.status(500).send({ error: "Unable to find a lobby with such name." });
        }

        else {
            // Cheque se a capacidade atual de jogadores é igual ou excede a capacidade máxima da sala.
            if (result.current_capacity >= result.capacity) {
                response.status(500).send({ error: "The specified lobby is already full." });
                return;
            }

            // Primeiramente, crie um novo usuário.
            const user = new User({ name: request.body.user || "Player", uid: Math.random( ) * 123456 });

            // Depois atualize a lista de usuários.
            Lobbies.updateOne({ _id: result._id }, { $push: { players: user } }, {}, (err) => {
                if (err) {
                    response.status(500).send({ error: "Unable to add a new user to existing lobby (internal error)." });
                }

                else {
                    response.status(200).send(user);
                }
            })
        }
    });
});

router.delete("/:name", async ( request, response ) => {
    Lobbies.findOne({ name: request.params.name }, (err, result) => {
        if (err) {
            response.status(500).send({ error: "Unable to search for lobby (internal error)." });
        }

        // Caso não exista um lobby com este nome.
        else if (result == undefined) {
            response.status(500).send({ error: "Unable to find a lobby with such name." });
        }

        else {
            const users = result.players;

            if (!(users instanceof Array)) {
                response.status(500).send({ error: "Unable to delete this player (internal error)." });
            }

            else if (users.length <= 0) {
                response.status(500).send({ error: "This lobby is empty." });
            }

            else if (request.body?.name == undefined) {
                response.status(500).send({ error: "The specified username is invalid." });
            }

            else if (users.indexOf(request.body?.name) == -1) {
                response.status(500).send({ error: "The specified username doesn't exist." });
            }

            else {
                Lobbies.updateOne({ _id: result._id }, { $pull: { players: { _id: result.id } } });
            }
        }
    });
});

export default router;