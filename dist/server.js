"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./db/database"));
const user_1 = __importDefault(require("./routes/user"));
const transaction_1 = __importDefault(require("./routes/transaction"));
require('./config/config');
class Server {
    constructor() {
        this.configServer = () => {
            this.server.use(cors_1.default());
            this.server.use(express_1.default.json());
            this.server.use('/user', this.userRouter);
            this.server.use('/transaction', this.transactionRouter);
        };
        this.runServer = () => {
            this.databaseConnection.makeConnectios();
            this.server.listen(this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port}`));
        };
        this.port = process.env.NODE_PORT;
        this.server = express_1.default();
        this.userRouter = user_1.default;
        this.transactionRouter = transaction_1.default;
        this.databaseConnection = new database_1.default();
        this.configServer();
        this.runServer();
        // Se usa el patron singleton para garantizar una sola intancia de la clase servidor
        Server.server = Server.server ? Server.server : this;
        return Server.server;
    }
}
exports.default = Server;
