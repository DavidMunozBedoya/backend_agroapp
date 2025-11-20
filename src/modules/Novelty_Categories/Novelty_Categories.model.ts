import { Conexion } from "../../config/dbConexion.ts";

export async function getNoveltyCategoriesDb() {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM novelty_categories");
        return rows;
    } catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function CreateNoveltyCategoryDb(name: string,) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("INSERT INTO novelty_categories (Category_Name) VALUES (?)", 
            [name]
        );
        return rows;
    }
    catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function DeleteNoveltyCategoryDb(id: number) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("update Novelty_Categories set States_idStates = 2 where idNovelty_Categories = ?",
            [id]
        );
        return rows;
    }
    catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function UpdateNoveltyCategoryDb(id: number, name: string) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("update Novelty_Categories set Category_Name = ? where idNovelty_Categories = ?",
            [name, id]
        );
        return rows;
    }
    catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}