import express from "express";
import {
    getSpecies,
    getSpeciesByIdHandler,
    createSpeciesHandler,
    updateSpeciesHandler,
    deleteSpeciesHandler
} from './species.controller.ts';

const router = express.Router();

router.get('/', getSpecies);
router.get('/:id', getSpeciesByIdHandler);
router.post('/', createSpeciesHandler);
router.put('/:id', updateSpeciesHandler);
router.delete('/:id', deleteSpeciesHandler);

export default router;
