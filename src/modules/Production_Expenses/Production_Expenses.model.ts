import { Conexion } from "../../config/dbConexion.ts";


export const getProductionExpenses = async () => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query("SELECT * FROM production_expenses");
        return rows;
    } catch (error) {
        throw error;
    }
};

export const createProductionExpense = async (
    Supplies_idSupplies: number,
    description: string,
    cost: number,
    Quantity: number,
    batches_idBatches: number,
    date: string
) => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query(
            `INSERT INTO production_expenses 
                (Supplies_idSupplies, Description, Cost, Quantity, Batches_idBatches, Date_Expense)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [Supplies_idSupplies, description, cost, Quantity, batches_idBatches, date]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};


export const updateProductionExpense = async (
    id: number,
    Supplies_idSupplies: number,
    description: string,
    cost: number,
    Quantity: number,
    batches_idBatches:number,
    date: string
) => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query(
            `UPDATE production_expenses 
             SET Supplies_idSupplies = ?, Description = ?, Cost = ?, Quantity = ?, Batches_idBatches = ?, Date_Expense = ?
             WHERE idProduction_Expenses = ?`,
            [Supplies_idSupplies, description, cost, Quantity, batches_idBatches, date, id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};


export const getExpenseById = async (expenseId:number) => {
    try {
        const connection = await Conexion();
        const [rows] = await connection.query(
            `SELECT * FROM production_expenses WHERE idProduction_Expenses = ?`,
            [expenseId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};



