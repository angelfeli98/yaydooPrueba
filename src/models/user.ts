
import mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema(
    {
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
            type: mongoose.Types.ObjectId,
            ref: 'Account'
        }
    },
    {
        toJSON: {
            transform: (doc, ret): any => {
                const { _id, __v, password, ...data } = ret;
                return {...data, id: _id};
            }
        }
    }
);

export default mongoose.model('User', userSchema);