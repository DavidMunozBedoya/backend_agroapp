import { getUserDb } from "./user.model.ts";
import type { Response, Request } from "express";

export async function getUserController(req: Request, res: Response) {
    try {
        const users = await getUserDb();
        res.status(200).send({
            status: "success",
            data: users,
        })

    } catch (e) {
        res.status(500).send({
            status: "error",
            message: "Internal Server Error",
        });
    }
}