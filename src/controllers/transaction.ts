
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

const getTransactionByClient = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.find({ from: id }).populate({path: 'from'});
        if (transaction) {
            return res.status(200).json(transaction);
        }
        return res.status(404).json({message: 'No se han encontrado transacciones'});
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {
    createTransaction,
    getTransactionByClient
}