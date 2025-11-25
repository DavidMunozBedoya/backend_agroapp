// src/modules/batches/batches.router.ts
import express from 'express';
import {
    getBatches,
    getBatchByIdHandler,
    createBatchHandler,
    updateBatchHandler,
    deleteBatchHandler
} from './batches.controller.ts';

const router = express.Router();

router.get('/batch', getBatches);
router.get('/batch/:id', getBatchByIdHandler);
router.post('/batch', createBatchHandler);
router.put('/batch/:id', updateBatchHandler);
router.put('/batch/:id', deleteBatchHandler);

export default router;
