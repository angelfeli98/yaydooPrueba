
import mongoose from 'mongoose';

const accountSchema: mongoose.Schema = new mongoose.Schema(
    {
        money: {
            type: Number,
            default: (): number => Math.round(Math.random() * 20000),
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        transaction: [{
            type: mongoose.Types.ObjectId,
            ref: 'Transaction'
        }]
    },
    {
        toJSON: {
            transform: (doc, ret): any => {
                const { _id, __v, ...data } = ret;
                return {...data, id: _id};
            }
        }
    }
);

export default mongoose.model('Account', accountSchema);