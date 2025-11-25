import express from 'express';
import { getProductionsController,createProductionController,updateProductionController } from './Production.controller.ts';

const router = express.Router();

// Rutas de Production
router.get('/productions', getProductionsController);
router.post('/productions', createProductionController);
router.put('/productions/:id', updateProductionController);

export default router;