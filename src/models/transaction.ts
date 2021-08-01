
import mongoose from 'mongoose';

const transactionSchema: mongoose.Schema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'El monto es un campo obligatorio']
        },
        from: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'El origen es un campo obligatorio']
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
            ref: 'User',
            required: [true, 'El destinatario es un campo obligatorio']
        }
    }
);

export default mongoose.model('Transaction', transactionSchema);