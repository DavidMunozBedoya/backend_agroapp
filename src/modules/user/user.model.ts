import { Conexion } from "../../config/dbConexion.ts";
import bcrypt from "bcryptjs";
import { validateUser } from "../helpers/validator.js";

export interface User {
    user_name: string;
    email_user: string;
    phone_number: string;
    password: string;
}

export async function getUserDb() {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM users");
        return rows;
    } catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function CreateUserDb(userData: User) {
    try {
        const errors = validateUser(userData);
        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const connection = await Conexion();
        const [rows] = await connection.query("INSERT INTO users (user_name, email_user, phone_number, password) VALUES (?, ?, ?, ?)",
            [userData.user_name, userData.email_user, userData.phone_number, bcrypt.hashSync(userData.password, 10)]
        );
        return rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getUserByIdDb(id: string) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM users WHERE idUsers = ?", [id]);
        return rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function updateUserDb(id: string, userData: User) {
    try {
        const errors = validateUser(userData);
        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const connection = await Conexion();
        const [result] = await connection.query("UPDATE users SET user_name = ?, email_user = ?, phone_number = ?, password = ? WHERE idUsers = ?",
            [userData.user_name, userData.email_user, userData.phone_number, bcrypt.hashSync(userData.password, 10), id]
        );
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function deleteUserDb(id: string) {
    try {
        const connection = await Conexion();
        const [result] = await connection.query("DELETE FROM users WHERE idUsers = ?", [id]);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    }
}