import express from "express";
import {
    getSpecies,
    getSpeciesByIdHandler,
    createSpeciesHandler,
    updateSpeciesHandler,
    deleteSpeciesHandler
} from './species.controller.ts';

const router = express.Router();

router.get('/species', getSpecies);
router.get('/species/:id', getSpeciesByIdHandler);
router.post('/species', createSpeciesHandler);
router.put('/species/:id', updateSpeciesHandler);
router.delete('/species/:id', deleteSpeciesHandler);

export default router;
