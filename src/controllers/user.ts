
import { Response, Request } from 'express';
import User from '../models/user';
import Account from '../models/account';

const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = req.body;
        const user = new User(data);
        const savedUser = await user.save();
        if (savedUser) {
            const account = new Account({user: savedUser._id});
            const savedAccount = await account.save();
            const updatedUser = await User.findByIdAndUpdate(savedUser._id, {account: savedAccount._id},{ new: true });
            return res.status(200).json(updatedUser);
        }
        return res.status(401).json({message: 'Cliente no creado'})
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            // Se elimna la cuenta del usuario eliminado pero no sus transacciones
            await Account.findOneAndDelete({user: deletedUser._id});
            return res.status(200).json({message: 'Cliente eliminado'});
        }
        return res.status(401).json({message: 'Cliente no se ha encontrado'});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user, password } = req.query
        const client = await User.findOne({user});
        
        if (!client) {
            return res.status(401).json({message: 'Usuario o contraseña incorrecta'})
        } 


    } catch (error) {
        return res.status(500).json(error);
    }
};

const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const { date } = req.headers;
        // La query se hace en base a si se pasa el parametro fecha
        const query = date ? { registrationDate : { $gte: date }} : {};
        const users = await User.find(query).populate({ path: 'account', populate: { path: 'transactions' } });
        if (users) {
            return res.status(200).json(users);
        }
        return res.status(404).json({message: 'Los clientes no se ha encontrado'});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {
    registerUser,
    deleteUser,
    getUsers,
    login
}