import { Conexion } from "../../config/dbConexion.ts";
import bcrypt from "bcryptjs";

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
