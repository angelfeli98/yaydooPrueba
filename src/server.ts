
import express from "express";
import cors from 'cors';
import ConnectionDB from "./db/database";

require('./config/config');

export default class Server{

    static server: Server;

    private port: string | undefined;
    private server: express.Application;
    private databaseConnection: ConnectionDB;

    constructor() {
        this.port = process.env.NODE_PORT;
        this.server = express();
        this.databaseConnection = new ConnectionDB();
        this.configServer();
        this.runServer();
        Server.server = Server.server ? Server.server : this;
        return Server.server;
    }

    private configServer = (): void => {
        this.server.use(cors());
    }

    private runServer = (): void  => {
        this.databaseConnection.makeConnectios();
        this.server.listen(this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port}`));
    }
}