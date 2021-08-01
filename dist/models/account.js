"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    money: {
        type: Number,
        default: () => Math.round(Math.random() * 20000),
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
    transaction: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Transaction'
        }]
}, {
    toJSON: {
        transform: (doc, ret) => {
            const { _id, __v, ...data } = ret;
            return { ...data, id: _id };
        }
    }
});
exports.default = mongoose_1.default.model('Account', accountSchema);
