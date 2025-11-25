import express from "express";
import {
    getNoveltiesController,
    createNoveltyController,
    getNoveltyByIdController,
    updateNoveltyController,
    deleteNoveltyController
} from "./novelties.controller.ts";

const router = express.Router();

router.get("/novelties", getNoveltiesController);
router.post("/novelties", createNoveltyController);
router.get("/novelties/:id", getNoveltyByIdController);
router.put("/novelties/:id", updateNoveltyController);
router.delete("/novelties/:id", deleteNoveltyController);

export default router;
