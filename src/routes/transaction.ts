
import { Router } from 'express';
import * as Transaction from '../controllers/transaction';

const transactionRouter = Router();

transactionRouter.post('', Transaction.createTransaction);

export default transactionRouter;