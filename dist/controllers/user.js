"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypt = exports.login = exports.getUsers = exports.deleteUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const account_1 = __importDefault(require("../models/account"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const user = new user_1.default(data);
        const savedUser = await user.save();
        if (savedUser) {
            const account = new account_1.default({ user: savedUser._id });
            const savedAccount = await account.save();
            const updatedUser = await user_1.default.findByIdAndUpdate(savedUser._id, { account: savedAccount._id }, { new: true });
            return res.status(200).json(updatedUser);
        }
        return res.status(401).json({ message: 'Cliente no creado' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.registerUser = registerUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await user_1.default.findByIdAndDelete(id);
        if (deletedUser) {
            // Se elimna la cuenta del usuario eliminado pero no sus transacciones
            await account_1.default.findOneAndDelete({ user: deletedUser._id });
            return res.status(200).json({ message: 'Cliente eliminado' });
        }
        return res.status(401).json({ message: 'Cliente no se ha encontrado' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteUser = deleteUser;
const login = async (req, res) => {
    try {
        const { user, password } = req.query;
        const client = await user_1.default.findOne({ user });
        if (!client) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
        }
        if (client.get('password') !== password) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
        }
        return res.status(200).json(client);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.login = login;
const getUsers = async (req, res) => {
    try {
        const { date } = req.headers;
        // La query se hace en base a si se pasa el parametro fecha
        const query = date ? { registrationDate: { $gte: date } } : {};
        const users = await user_1.default.find(query).populate({ path: 'account', populate: { path: 'transactions' } });
        if (users) {
            return res.status(200).json(users);
        }
        return res.status(404).json({ message: 'Los clientes no se ha encontrado' });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getUsers = getUsers;
const crypt = (req, res) => {
    try {
        const data = req.query.data;
        const encrypt = crypto_js_1.default.MD5(data).toString();
        return res.status(200).json({ data: encrypt });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.crypt = crypt;
