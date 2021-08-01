
import express, { Router } from "express";
import cors from 'cors';
import ConnectionDB from "./db/database";
import userRouter from "./routes/user";

require('./config/config');

export default class Server{

    static server: Server;

    private port: string | undefined;
    private server: express.Application;
    private databaseConnection: ConnectionDB;
    private userRouter: Router;

    constructor() {
        this.port = process.env.NODE_PORT;
        this.server = express();
        this.userRouter = userRouter;
        this.databaseConnection = new ConnectionDB();
        this.configServer();
        this.runServer();
        Server.server = Server.server ? Server.server : this;
        return Server.server;
    }

    private configServer = (): void => {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use('/user', this.userRouter);
    }

    private runServer = (): void  => {
        this.databaseConnection.makeConnectios();
        this.server.listen(this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port}`));
    }
}