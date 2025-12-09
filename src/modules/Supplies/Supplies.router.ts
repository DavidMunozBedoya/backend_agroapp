import express from "express";
import {
    getSupplies,
    getSuppliesByIdHandler,
    createSuppliesHandler,
    updateSuppliesHandler,
    deleteSuppliesHandler
} from './Supplies.controller.ts';

const router = express.Router();

router.get('/supplies', getSupplies);
router.get('/supplies/:id', getSuppliesByIdHandler);
router.post('/supplies', createSuppliesHandler);
router.put('/supplies/:id', updateSuppliesHandler);
router.delete('/supplies/:id', deleteSuppliesHandler);

export default router;
