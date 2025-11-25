import type { Request, Response } from "express";
import {
    getNoveltiesDb,
    createNoveltyDb,
    getNoveltyByIdDb,
    updateNoveltyDb,
    deleteNoveltyDb
} from "./novelties.model.ts";

export async function getNoveltiesController(req: Request, res: Response) {
    try {
        const novelties = await getNoveltiesDb();
        res.status(200).json({
            status: "Success",
            data: novelties
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`
        });
    }
}

export async function createNoveltyController(req: Request, res: Response) {
    try {
        const data = req.body;
        const result = await createNoveltyDb(data);
        res.status(201).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`
        });
    }
}

export async function getNoveltyByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const novelty = await getNoveltyByIdDb(id);
        res.status(200).json({
            status: "Success",
            data: novelty
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`
        });
    }
}

export async function updateNoveltyController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await updateNoveltyDb(id, data);
        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`
        });
    }
}

export async function deleteNoveltyController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await deleteNoveltyDb(id);
        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`
        });
    }
}
