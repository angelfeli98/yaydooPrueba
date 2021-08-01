
import { Router } from 'express';
import * as User from '../controllers/user';

const userRouter = Router();

userRouter.get('', User.getUsers);
userRouter.post('', User.registerUser);
userRouter.delete('/:id', User.deleteUser);

export default userRouter;