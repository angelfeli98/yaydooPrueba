
import mongoose from 'mongoose';

const transactionSchema: mongoose.Schema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'El monto es un campo obligatorio']
        },
        from: {
            type: mongoose.Types.ObjectId,
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
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
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

export default mongoose.model('Transaction', transactionSchema);