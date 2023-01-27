export default class GamePlayer {
    private score: number = 0;

    public constructor(
        private name: string,
        private readonly id: string
    ) { }

    public getName( ): string {
        return this.name;
    }

    public getUUID( ): string {
        return this.id;
    }

    public getScore( ): number {
        return this.score;
    }

    public addScore(
        increment: number = 1
    ): void {
        this.score += increment
    }
};