"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es un valor obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es un valor obligatorio']
    },
    user: {
        type: String,
        required: [true, 'El usuario es un valor obligatorio']
    },
    registrationDate: {
        type: Date,
        default: () => Date.now()
    },
    account: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Account'
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            const { _id, __v, password, ...data } = ret;
            return { ...data, id: _id };
        }
    }
});
exports.default = mongoose_1.default.model('User', userSchema);
