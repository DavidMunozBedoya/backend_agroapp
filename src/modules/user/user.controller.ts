import { getUserDb, CreateUserDb, getUserByIdDb, updateUserDb, deleteUserDb } from "./user.model.ts";
import type { Response, Request } from "express";

export async function getUserController(req: Request, res: Response) {
    try {
        const users = await getUserDb();
        res.status(200).send({
            status: "Success",
            data: users,
        })

    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function createUserController(req: Request, res: Response) {
    try {
        const userData = req.body;
        const user = await CreateUserDb(userData);
        res.status(201).send({
            status: "Success",
            data: user,
        })
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function getUserByIdController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await getUserByIdDb(id);
        res.status(200).send({
            status: "Success",
            data: user,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function updateUserController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const userData = req.body;
        const result = await updateUserDb(id, userData);
        res.status(200).send({
            status: "Success",
            data: result,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function deleteUserController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await deleteUserDb(id);
        res.status(200).send({
            status: "Success",
            data: result,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}
