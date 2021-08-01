import mongoose from "mongoose";

export default class ConnectionDB{

    private url: string;
    private options: mongoose.ConnectOptions;
    private database = mongoose;

    constructor(){
        this.url = 'mongodb+srv://feli:feli@cluster0.ubsea.mongodb.net/yaydoo?retryWrites=true&w=majority';
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        };
    }

    public makeConnectios = async(): Promise<any> => {
        try {
            await this.database.connect(this.url, this.options);
            console.log('Conexion a la base de datos lista');
        } catch (error) {
            console.log('Error al conectar a la base de datos');
        }
    }
} 