import express from 'express';
import { getProductionExpensesController, createProductionExpenseController, updateProductionExpenseController, getExpenseByIdController } from './Production_Expenses.controller.ts';

const router = express.Router();

// Rutas de Production Expenses
router.get('/production-expenses', getProductionExpensesController);
router.post('/production-expenses', createProductionExpenseController);
router.put('/production-expenses/:id', updateProductionExpenseController);
router.get('/production-expenses/:id', getExpenseByIdController);


export default router;