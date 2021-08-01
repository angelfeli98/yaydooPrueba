"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('./config/config');
class Server {
    constructor() {
        this.configServer = () => {
            this.server.use(cors_1.default());
        };
        this.runServer = () => {
            this.server.listen(this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port}`));
        };
        this.port = process.env.NODE_PORT;
        this.server = express_1.default();
        this.configServer();
        this.runServer();
        Server.server = Server.server ? Server.server : this;
        return Server.server;
    }
}
exports.default = Server;
