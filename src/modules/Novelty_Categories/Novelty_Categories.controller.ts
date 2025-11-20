import { getNoveltyCategoriesDb,CreateNoveltyCategoryDb,DeleteNoveltyCategoryDb,UpdateNoveltyCategoryDb } from "./Novelty_Categories.model.ts";
import { validateNoveltyCategory } from "../helpers/validator.js";

import type { Response, Request } from "express";

export async function getNoveltyCategoriesController(req: Request, res: Response) {
    try {
        validateNoveltyCategory(req);
        const noveltyCategories = await getNoveltyCategoriesDb();
        res.status(200).send({
            status: "Success",
            data: noveltyCategories,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function CreateNoveltyCategoryController(req: Request, res: Response) {
    try {
        const { Category_Name } = req.body;
        const newNoveltyCategory = await CreateNoveltyCategoryDb(Category_Name);
        res.status(201).send({
            status: "Success",
            data: newNoveltyCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function DeleteNoveltyCategoryController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedNoveltyCategory = await DeleteNoveltyCategoryDb(Number(id));
        res.status(200).send({
            status: "Success",
            data: deletedNoveltyCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function UpdateNoveltyCategoryController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { Category_Name } = req.body;
        const updatedNoveltyCategory = await UpdateNoveltyCategoryDb(Number(id), Category_Name);
        res.status(200).send({
            status: "Success",
            data: updatedNoveltyCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}