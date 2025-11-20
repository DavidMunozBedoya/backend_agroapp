import { Conexion } from "../../config/dbConexion.ts";

export async function getSupplierCategory() {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM supplies_category");
        return rows;
    } catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function CreateSupplierCategory(name: string,) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("INSERT INTO supplies_category (Category_Name) VALUES (?)", 
            [name]
        );
        return rows;
    }
    catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function DeleteSupplierCategory(id: number) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("update Supplies_Category set States_idStates = 2 where idSupplies_Category = ?",
            [id]
        );
        return rows;
    }
    catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}

export async function UpdateSupplierCategory(id: number, name: string) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("update Supplies_Category set Category_Name = ? where idSupplies_Category = ?",
            [name, id]
        );
        return rows;
    }
    catch (e) {
        console.log(e);
        throw e; // Es buena práctica relanzar el error para que el controlador lo maneje
    }
}