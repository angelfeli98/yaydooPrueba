
import { Router } from 'express';
import * as User from '../controllers/user';

const userRouter = Router();

userRouter.get('', User.getUsers);
userRouter.get('/login', User.login);
userRouter.post('', User.registerUser);
userRouter.delete('/:id', User.deleteUser);
userRouter.get('/encrypt', User.crypt);

export default userRouter;