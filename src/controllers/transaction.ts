
import { Response, Request } from 'express';
import User from '../models/user';
import Transaction from '../models/transaction';
import Account from '../models/account';

const createTransaction = async (req: Request, res: Response): Promise<any> => {
    try {
        const {from, to, amount, ...data} = req.body;

        // Se obtienen las cuentas involucradas
        const account = await Account.findOne({ user: from });
        const des = await Account.findOne({ user: to });

        if (account.get('money') < amount) {
            return res.status(200).json({message: 'no tiene los fondos suficientes'});
        }

        const transaction = new Transaction({amount, ...data, from, to});
        const savedTransaction = await transaction.save(); 

        // Se actualiza el saldo actual de las cuentas y se agrega la transaccion a la cuenta
        const fromAccount = await Account.findOneAndUpdate({ user: from }, { $push: { transaction: savedTransaction, amount: amount - account.get('money') } });
        const toAccount = await Account.findOneAndUpdate({ user: to }, { $push: { transaction: savedTransaction, amount: amount + account.get('money') } });

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
        const { date } = req.headers;
        const query = date ? { date : { $gte: date }, from: id} : { from: id };
        const transaction = await Transaction.find(query).populate({path: 'from'}).populate({path: 'to'});
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