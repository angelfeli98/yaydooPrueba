
import { Response, Request } from 'express';
import mongoose from 'mongoose';
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
        return res.status(401).json({message: 'Usuario no creado'})
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {
    registerUser
}