import type { Request,Response } from "express";
import { getProductions,createProduction,updateProduction,getBatchById } from "./Production.model.ts";

export const getProductionsController = async (req:Request,res:Response) => {
    try {
        const productions = await getProductions();
        res.status(200).json({
            status: "Success",
            data: productions,
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};

export const createProductionController = async (req: Request, res: Response) => {
    try {
        const { Batches_idBatches, Date_Production, Avg_Weight, Weight_Cost } = req.body;

        // Obtener el lote correctamente
        const batchRows: any = await getBatchById(Batches_idBatches);

        if (!batchRows || batchRows.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: `El lote con id ${Batches_idBatches} no existe.`,
            });
        }

        const animals = batchRows[0].Total_Quantity;

        console.log({
            animals,
            Avg_Weight,
            Weight_Cost
        });


        // Cálculos seguros
        const totalWeight = animals * Avg_Weight;
        const totalProduction = totalWeight * Weight_Cost;

        const finalDate =
            Date_Production
                ? `${Date_Production} 00:00:00`
                : new Date().toISOString().slice(0, 19).replace("T", " ");

        // Insertar producción
        const result: any = await createProduction(
            Batches_idBatches,
            finalDate,
            Avg_Weight,
            totalWeight,
            Weight_Cost,
            totalProduction
        );

        res.status(201).json({
            status: "Success",
            message: "Production created successfully",
            data: result,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};


export const updateProductionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { Batches_idBatches, Avg_Weight, Weight_Cost, Date_Production } = req.body;

        // Traer lote correctamente
        const batchRows: any = await getBatchById(Batches_idBatches);

        if (!batchRows || batchRows.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: `El lote con id ${Batches_idBatches} no existe.`,
            });
        }

        const animals = batchRows[0].Total_Quantity;

        // Recalcular
        const avgWeightFinal = Number(Avg_Weight);
        const weightCostFinal = Number(Weight_Cost);

        const totalWeight = animals * avgWeightFinal;
        const totalProduction = totalWeight * weightCostFinal;

        const finalDate = Date_Production
            ? `${Date_Production} 00:00:00`
            : new Date().toISOString().slice(0, 19).replace("T", " ");

        // Actualizar
        const updated = await updateProduction(
            Number(id),
            Batches_idBatches,
            finalDate,
            avgWeightFinal,
            totalWeight,
            weightCostFinal,
            totalProduction
        );

        return res.status(200).json({
            status: "Success",
            message: "Production updated successfully",
            data: updated,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Error",
            message: `Internal Server Error: ${error}`,
        });
    }
};
