import * as Express from "express";
import BodyParser from "body-parser";
import Cors from "cors";

// Classe responsável pela organização e o registro de
// rotas da nossa API.
export default class RouteManager {
    private readonly app = Express.default( );

    public constructor( ) { 
        this.app.use(BodyParser.json());
        this.app.use(BodyParser.raw());
        this.app.use(Cors({
            "credentials": false,
        }));

        // this.app.listen(this.port, ( ) => {
        //     console.log(`Listening to port: ${this.port}!`);
        // });
    }

    public addRouter(
        route: Express.Router, 
        path: string
    ) {
        this.app.use(path, route);
    }

    public getApp( ): Express.Application {
        return this.app;
    }
}