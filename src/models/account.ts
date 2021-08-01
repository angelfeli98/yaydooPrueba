
import mongoose from 'mongoose';

const accountSchema: mongoose.Schema = new mongoose.Schema(
    {
        money: {
            type: Number,
            default: 0
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        transaction: [{
            type: mongoose.Types.ObjectId,
            ref: 'Transaction'
        }]
    }
);

export default mongoose.model('Account', accountSchema);