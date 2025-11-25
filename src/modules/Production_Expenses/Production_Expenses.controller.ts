import type { Request,Response } from "express";
import { getProductionExpenses,createProductionExpense,updateProductionExpense,getExpenseById } from "./Production_Expenses.model.ts";

export const getProductionExpensesController = async (req:Request,res:Response) => {
    try {
        const expenses = await getProductionExpenses();
        res.status(200).json({
            status: "Success",
            data: expenses,
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};

export const createProductionExpenseController = async (req: Request, res: Response) => {
    try {
        const { Supplies_idSupplies, Description, Cost, Quantity, Batches_idBatches, Date_Expense } = req.body; 
        const finalDate =
            Date_Expense
                ? `${Date_Expense} 00:00:00`
                : new Date().toISOString().slice(0, 19).replace("T", " ");
        const result: any = await createProductionExpense(
            Supplies_idSupplies,
            Description,
            Cost,
            Quantity,
            Batches_idBatches,
            finalDate
        );
        res.status(201).json({
            status: "Success",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};
export const updateProductionExpenseController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { Supplies_idSupplies, Description, Cost, Quantity, Batches_idBatches, Date_Expense } = req.body;
        const finalDate =
            Date_Expense
                ? `${Date_Expense} 00:00:00`
                : new Date().toISOString().slice(0, 19).replace("T", " ");
        const result: any = await updateProductionExpense(
            Number(id),
            Supplies_idSupplies,
            Description,
            Cost,
            Quantity,
            Batches_idBatches,
            finalDate
        );
        res.status(200).json({
            status: "Success",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};

export const getExpenseByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const expense = await getExpenseById(Number(id));
        if (!expense || (Array.isArray(expense) && expense.length === 0)) {
            return res.status(404).json({
                status: "Error",
                message: `Expense with id ${id} not found.`,
            });
        }
        res.status(200).json({
            status: "Success",
            data: expense,
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};