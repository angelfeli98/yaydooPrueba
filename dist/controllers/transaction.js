"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionByClient = exports.createTransaction = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
const account_1 = __importDefault(require("../models/account"));
const createTransaction = async (req, res) => {
    try {
        const { from, to, amount, ...data } = req.body;
        // Se obtienen las cuentas involucradas
        const account = await account_1.default.findOne({ user: from });
        const des = await account_1.default.findOne({ user: to });
        if (account.get('money') < amount) {
            return res.status(200).json({ message: 'no tiene los fondos suficientes' });
        }
        const transaction = new transaction_1.default({ amount, ...data, from, to });
        const savedTransaction = await transaction.save();
        // Se actualiza el saldo actual de las cuentas y se agrega la transaccion a la cuenta
        const fromAccount = await account_1.default.findOneAndUpdate({ user: from }, { $push: { transaction: savedTransaction, amount: amount - account.get('money') } });
        const toAccount = await account_1.default.findOneAndUpdate({ user: to }, { $push: { transaction: savedTransaction, amount: amount + account.get('money') } });
        if (savedTransaction && fromAccount && toAccount) {
            return res.status(200).json(savedTransaction);
        }
        return res.status(400).json({ message: 'No se pudo crear la transaccion' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.createTransaction = createTransaction;
const getTransactionByClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.headers;
        const query = date ? { date: { $gte: date }, from: id } : { from: id };
        const transaction = await transaction_1.default.find(query).populate({ path: 'from' }).populate({ path: 'to' });
        if (transaction) {
            return res.status(200).json(transaction);
        }
        return res.status(404).json({ message: 'No se han encontrado transacciones' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getTransactionByClient = getTransactionByClient;
