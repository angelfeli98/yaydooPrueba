
import { Router } from 'express';
import * as Transaction from '../controllers/transaction';

const transactionRouter = Router();

transactionRouter.post('', Transaction.createTransaction);
transactionRouter.get('/getByClient/:id', Transaction.getTransactionByClient);

export default transactionRouter;