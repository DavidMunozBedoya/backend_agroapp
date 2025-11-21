import { Conexion } from "../../config/dbConexion.ts";

export const getProductions = async () => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM production");
        return rows;
    } catch (error) {
        throw error;
    }
};

export const createProduction = async (
    batchId: number,
    date: string,
    avgWeight: number,
    totalWeight: number,
    weightCost: number,
    totalProduction: number
) => {
  try {
    const connection = await Conexion();
    const [rows] = await connection.query(
      `INSERT INTO production (Batches_idBatches, Date_Production, Avg_Weight, Total_Weight, Weight_Cost, Total_Production)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [batchId, date, avgWeight, totalWeight, weightCost, totalProduction]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

export const updateProduction = async (
    id: number,
    batchId: number,
    date: string,
    avgWeight: number,
    totalWeight: number,
    weightCost: number,
    totalProduction: number
) => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query(
            `UPDATE production 
             SET Batches_idBatches = ?, Date_Production = ?, Avg_Weight = ?, Total_Weight = ?, Weight_Cost = ?, Total_Production = ?
             WHERE idProduction = ?`,
            [batchId, date, avgWeight, totalWeight, weightCost, totalProduction, id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export const getBatchById = async (batchId:number) => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query(
            `SELECT * FROM batches WHERE idBatches = ?`,
            [batchId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
}
