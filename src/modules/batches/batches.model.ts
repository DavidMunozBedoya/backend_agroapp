// src/modules/batches/batches.model.ts
import { Conexion } from '../../config/dbConexion.ts';

export interface Batch {
    idBatches: number;
    Starting_Date: string;      
    Unit_Cost: number;
    Total_Quantity: number;
    Cost: number;
    Weight_Batch: number;
    Age_Batch: number;
    Species_idSpecies: number;
    States_idStates: number;
}

export interface BatchInput {
    Unit_Cost: number;
    Total_Quantity: number;
    Cost: number;
    Weight_Batch: number;
    Age_Batch: number;
    Species_idSpecies: number;
    States_idStates: number;
}

// Obtener todas las batches
export async function getAllBatches(): Promise<Batch[]> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        `SELECT idBatches, Starting_Date, Unit_Cost, Total_Quantity,
                Cost, Weight_Batch, Age_Batch, Species_idSpecies, States_idStates
        FROM batches
        WHERE States_idStates = 1`
        );
        return rows as Batch[];
    } catch (error) {
        console.error('Error en getAllBatches:', error);
        throw new Error('Error al obtener las batches');
    } finally {
        await connection.end();
    }
}

// Obtener batch por ID
export async function getBatchById(id: number): Promise<Batch | null> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        `SELECT idBatches, Starting_Date, Unit_Cost, Total_Quantity,
                Cost, Weight_Batch, Age_Batch, Species_idSpecies, States_idStates
        FROM batches
        WHERE idBatches = ? AND States_idStates = 1`,
        [id]
        );
        const batch = (rows as Batch[])[0];
        return batch ?? null;
    } catch (error) {
        console.error('Error en getBatchById:', error);
        throw new Error('Error al obtener la batch');
    } finally {
        await connection.end();
    }
}

// Crear nueva batch
export async function createBatch(data: BatchInput): Promise<Batch> {
    const connection = await Conexion();
    try {
        const [result] = await connection.query(
        `INSERT INTO batches
        (Starting_Date, Unit_Cost, Total_Quantity, Cost,
            Weight_Batch, Age_Batch, Species_idSpecies, States_idStates)
        VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.Unit_Cost,
            data.Total_Quantity,
            data.Cost,
            data.Weight_Batch,
            data.Age_Batch,
            data.Species_idSpecies,
            data.States_idStates
        ]
        );

        const insertResult = result as any;

        // Volvemos a consultar para traer la fila completa con la fecha exacta
        const newBatch = await getBatchById(insertResult.insertId);
        if (!newBatch) {
        throw new Error('No se pudo recuperar la batch creada');
        }

        return newBatch;
    } catch (error) {
        console.error('Error en createBatch:', error);
        throw new Error('Error al crear la batch');
    } finally {
        await connection.end();
    }
}

// Actualizar batch
export async function updateBatch(id: number,data: BatchInput): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [result] = await connection.query(
        `UPDATE batches
        SET Unit_Cost = ?, Total_Quantity = ?, Cost = ?,
            Weight_Batch = ?, Age_Batch = ?, Species_idSpecies = ?, States_idStates = ?
        WHERE idBatches = ? AND States_idStates = 1`,
        [
            data.Unit_Cost,
            data.Total_Quantity,
            data.Cost,
            data.Weight_Batch,
            data.Age_Batch,
            data.Species_idSpecies,
            data.States_idStates,
            id
        ]
        );

        const updateResult = result as any;
        return updateResult.affectedRows > 0;
    } catch (error) {
        console.error('Error en updateBatch:', error);
        throw new Error('Error al actualizar la batch');
    } finally {
        await connection.end();
    }
}

// Borrado LÓGICO de batch
export async function deleteBatch(id: number): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [result] = await connection.query(
        'UPDATE batches SET States_idStates = 2 WHERE idBatches = ? AND States_idStates = 1',
        [id]
        );

        const deleteResult = result as any;
        return deleteResult.affectedRows > 0;
    } catch (error) {
        console.error('Error en deleteBatch:', error);
        throw new Error('Error al eliminar (lógicamente) la batch');
    } finally {
        await connection.end();
    }
}

// --------- Validación de FKs (existe especie y estado) ----------

// Valida que la especie exista
export async function existsSpeciesById(id: number): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        'SELECT idSpecies FROM species WHERE idSpecies = ?',
        [id]
        );
        return (rows as any[]).length > 0;
    } catch (error) {
        console.error('Error en existsSpeciesById:', error);
        throw new Error('Error al validar la especie');
    } finally {
        await connection.end();
    }
}

// Valida que el estado exista en la tabla states
export async function existsStateById(id: number): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        'SELECT idStates FROM states WHERE idStates = ?',
        [id]
        );
        return (rows as any[]).length > 0;
    } catch (error) {
        console.error('Error en existsStateById:', error);
        throw new Error('Error al validar el estado');
    } finally {
        await connection.end();
    }
}
