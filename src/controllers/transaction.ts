
import { Response, Request } from 'express';
import User from '../models/user';
import Transaction from '../models/transaction';
import Account from '../models/account';

const createTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const {from, to, ...data} = req.body;
        const transaction = new Transaction(data);
        const savedTransaction = await transaction.save(); 
        const fromAccount = await Account.findOneAndUpdate({ user: from }, { $push: { transaction: savedTransaction } });
        const toAccount = await Account.findOneAndUpdate({ user: to }, { $push: { transaction: savedTransaction } });

        if (savedTransaction && fromAccount && toAccount) {
            return res.status(200).json(savedTransaction);
        }

        return res.status(400).json({message: 'No se pudo crear la transaccion'});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {
    createTransaction
}