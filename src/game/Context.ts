import GamePlayer from "./Player.js";

enum GameState {
    NONE = -1,
    IDLE
};

export default class GameContext {
    private playerList: GamePlayer[];
    private currentPlayer: GamePlayer;

    private gameState: GameState = GameState.IDLE;

    public constructor() { }

    public getPlayers(): GamePlayer[ ] {
        return this.playerList;
    }

    public getPlayerById(id: string): GamePlayer {
        return this.playerList.find((player) => player.getUUID( ) == id);
    }

    public getCurrentTurn(): GamePlayer {
        return this.currentPlayer;
    }

    public getGameState(): GameState {
        return this.gameState;
    }
};