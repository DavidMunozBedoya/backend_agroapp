import { getUserDb, CreateUserDb, getUserByIdDb, updateUserDb, deleteUserDb, getUserByEmailDb } from "./user.model.ts";
import type { Response, Request } from "express";
import bcrypt from "bcryptjs";

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

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        
        // Validar que vengan los datos
        if (!email || !password) {
            return res.status(400).send({
                status: "Error",
                message: "Email y contraseña son requeridos",
            });
        }

        // Buscar usuario
        const user = await getUserByEmailDb(email);
        
        if (!user) {
            return res.status(401).send({
                status: "Error",
                message: "Credenciales inválidas",
            });
        }

        // Verificar contraseña
        const isMatch = bcrypt.compareSync(password, user.Password);
        
        if (!isMatch) {
            return res.status(401).send({
                status: "Error",
                message: "Credenciales inválidas",
            });
        }

        // Login exitoso - NO enviar la contraseña
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(200).send({
            status: "Success",
            message: "Sesión iniciada correctamente",
            data: userWithoutPassword,
            // Aquí irías agregando el token JWT después
        });
        
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}
