import { Conexion } from "../../config/dbConexion.ts";
import { validateNovelty } from "../helpers/validator.js";

export interface Novelty {
    Quantity: number;
    Description: string;
    Date_Novelty: string;
    Batches_idBatches: number;
    Novelty_Categories_idNovelty_Categories: number;
}

export async function getNoveltiesDb() {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM novelties");
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createNoveltyDb(data: Novelty) {
    try {
        const errors = validateNovelty(data);
        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const connection = await Conexion();
        const [result] = await connection.query(
            "INSERT INTO novelties (Quantity, Description, Date_Novelty, Batches_idBatches, Novelty_Categories_idNovelty_Categories) VALUES (?, ?, ?, ?, ?)",
            [data.Quantity,
            data.Description,
            data.Date_Novelty,
            data.Batches_idBatches,
            data.Novelty_Categories_idNovelty_Categories]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getNoveltyByIdDb(id: string) {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM novelties WHERE idNovelties = ?", [id]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateNoveltyDb(id: string, data: Novelty) {
    try {
        const errors = validateNovelty(data);
        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }

        const connection = await Conexion();
        const [result] = await connection.query(
            "UPDATE novelties SET Quantity = ?, Description = ?, Date_Novelty = ?, Batches_idBatches = ?, Novelty_Categories_idNovelty_Categories = ? WHERE idNovelties = ?",
            [data.Quantity,
            data.Description,
            data.Date_Novelty,
            data.Batches_idBatches,
            data.Novelty_Categories_idNovelty_Categories,
                id]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteNoveltyDb(id: string) {
    try {
        const connection = await Conexion();
        const [result] = await connection.query("DELETE FROM novelties WHERE idNovelties = ?", [id]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
