import { Conexion } from "../../config/dbConexion.ts";

// Tipo base que podemos reutilizar en el backend
export interface ProductionExpense {
  idProduction_Expenses: number;
  Supplies_idSupplies: number;
  Description: string;
  Cost: number;
  Quantity: number;
  Batches_idBatches: number;
  Supplie_Name?: string; // 👈 nombre del insumo que viene de la tabla supplies
}

// Obtener todos los gastos con el nombre del insumo
export const getProductionExpenses = async (): Promise<ProductionExpense[]> => {
  const connection = await Conexion();
  try {
    const [rows] = await connection.query(
      `SELECT 
                pe.idProduction_Expenses,
                pe.Supplies_idSupplies,
                s.Supplie_Name,              -- 👈 alias tal cual está en tu tabla
                pe.Description,
                pe.Cost,
                pe.Quantity,
                pe.Batches_idBatches
             FROM production_expenses pe
             INNER JOIN supplies s 
               ON s.idSupplies = pe.Supplies_idSupplies`
    );

    return rows as ProductionExpense[];
  } catch (error) {
    console.error("Error en getProductionExpenses:", error);
    throw new Error("Error al obtener los gastos");
  } finally {
    await connection.end();
  }
};

// Crear gasto
export const createProductionExpense = async (
  Supplies_idSupplies: number,
  description: string,
  cost: number,
  quantity: number,
  batches_idBatches: number
) => {
  const connection = await Conexion();
  try {
    const [result] = await connection.query(
      `INSERT INTO production_expenses 
                (Supplies_idSupplies, Description, Cost, Quantity, Batches_idBatches)
             VALUES (?, ?, ?, ?, ?)`,
      [Supplies_idSupplies, description, cost, quantity, batches_idBatches]
    );
    return result;
  } catch (error) {
    console.error("Error en createProductionExpense:", error);
    throw new Error("Error al crear el gasto");
  } finally {
    await connection.end();
  }
};

// Actualizar gasto
export const updateProductionExpense = async (
  id: number,
  Supplies_idSupplies: number,
  description: string,
  cost: number,
  quantity: number,
  batches_idBatches: number
) => {
  const connection = await Conexion();
  try {
    const [result] = await connection.query(
      `UPDATE production_expenses 
             SET Supplies_idSupplies = ?, 
                 Description = ?, 
                 Cost = ?, 
                 Quantity = ?, 
                 Batches_idBatches = ?    
             WHERE idProduction_Expenses = ?`,
      [Supplies_idSupplies, description, cost, quantity, batches_idBatches, id]
    );
    return result;
  } catch (error) {
    console.error("Error en updateProductionExpense:", error);
    throw new Error("Error al actualizar el gasto");
  } finally {
    await connection.end();
  }
};

// Obtener un gasto por id (también con nombre de insumo)
export const getExpenseById = async (
  expenseId: number
): Promise<ProductionExpense | null> => {
  const connection = await Conexion();
  try {
    const [rows] = await connection.query(
      `SELECT 
                pe.idProduction_Expenses,
                pe.Supplies_idSupplies,
                s.Supplie_Name,
                pe.Description,
                pe.Cost,
                pe.Quantity,
                pe.Batches_idBatches
             FROM production_expenses pe
             INNER JOIN supplies s 
               ON s.idSupplies = pe.Supplies_idSupplies
             WHERE pe.idProduction_Expenses = ?`,
      [expenseId]
    );

    const expenses = rows as ProductionExpense[];
    return expenses[0] ?? null;
  } catch (error) {
    console.error("Error en getExpenseById:", error);
    throw new Error("Error al obtener el gasto");
  } finally {
    await connection.end();
  }
};
