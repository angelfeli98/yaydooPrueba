
import { Router } from 'express';
import * as User from '../controllers/user';

const userRouter = Router();

userRouter.post('', User.registerUser);

export default userRouter;