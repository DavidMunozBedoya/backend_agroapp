import { Conexion } from "../../config/dbConexion.ts";
import bcrypt from "bcryptjs";
/* import validateUser from "../helpers/validator.js" */

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

export async function CreateUserDb(name:string, email:string, password:string) {
    try {
        const connection = await Conexion();
        // validaciones con validator
        const errors = [];


        const [rows] = await connection.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, bcrypt.hashSync(password, 10)]
        );
        return rows;
    } catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}