"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectionDB {
    constructor() {
        this.database = mongoose_1.default;
        this.makeConnectios = async () => {
            try {
                await this.database.connect(this.url, this.options);
                console.log('Conexion a la base de datos lista');
            }
            catch (error) {
                console.log('Error al conectar a la base de datos');
            }
        };
        this.url = 'mongodb+srv://feli:feli@cluster0.ubsea.mongodb.net/yaydoo?retryWrites=true&w=majority';
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
    }
}
exports.default = ConnectionDB;
