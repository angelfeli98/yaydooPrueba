"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    amount: {
        type: Number,
        required: [true, 'El monto es un campo obligatorio']
    },
    from: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: [true, 'La fecha es un campo obligatorio']
    },
    ref: {
        type: String
    },
    to: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            const { _id, __v, ...data } = ret;
            return { ...data, id: _id };
        }
    }
});
exports.default = mongoose_1.default.model('Transaction', transactionSchema);
