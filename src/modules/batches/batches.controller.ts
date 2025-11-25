import type { Request, Response } from 'express';
import {
    getAllBatches,
    getBatchById,
    createBatch,
    updateBatch,
    deleteBatch,
    existsSpeciesById,
    existsStateById
} from './batches.model.ts';
import type { BatchInput } from './batches.model.ts';

// ---------- Helpers de validación ----------

function validateIdParam(idParam: string): { id?: number; error?: string } {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return { error: 'El ID debe ser un número entero positivo.' };
    }
    return { id };
}

function validateBatchInput(body: any): { data?: BatchInput; errors: string[] } {
    const errors: string[] = [];

    // Función auxiliar para números
    const parseNumberField = (
        value: any,
        fieldName: string,
        { integer = false, min }: { integer?: boolean; min?: number }
    ): { value?: number; error?: string } => {
        const num = Number(value);
        if (Number.isNaN(num)) {
        return { error: `El campo ${fieldName} debe ser numérico.` };
        }
        if (integer && !Number.isInteger(num)) {
        return { error: `El campo ${fieldName} debe ser un número entero.` };
        }
        if (typeof min === 'number' && num < min) {
        return { error: `El campo ${fieldName} debe ser mayor o igual a ${min}.` };
        }
        return { value: num };
    };

    // Unit_Cost
    const unitCostResult = parseNumberField(body?.Unit_Cost, 'Unit_Cost', {
        integer: false,
        min: 0.01
    });
    if (unitCostResult.error) errors.push(unitCostResult.error);

    // Total_Quantity
    const totalQuantityResult = parseNumberField(
        body?.Total_Quantity,
        'Total_Quantity',
        { integer: true, min: 1 }
    );
    if (totalQuantityResult.error) errors.push(totalQuantityResult.error);

    // Cost
    const costResult = parseNumberField(body?.Cost, 'Cost', {
        integer: false,
        min: 0
    });
    if (costResult.error) errors.push(costResult.error);

    // Weight_Batch
    const weightResult = parseNumberField(
        body?.Weight_Batch,
        'Weight_Batch',
        { integer: false, min: 0.01 }
    );
    if (weightResult.error) errors.push(weightResult.error);

    // Age_Batch
    const ageResult = parseNumberField(body?.Age_Batch, 'Age_Batch', {
        integer: true,
        min: 0
    });
    if (ageResult.error) errors.push(ageResult.error);

    // Species_idSpecies
    const speciesResult = parseNumberField(
        body?.Species_idSpecies,
        'Species_idSpecies',
        { integer: true, min: 1 }
    );
    if (speciesResult.error) errors.push(speciesResult.error);

    // States_idStates
    const stateResult = parseNumberField(
        body?.States_idStates,
        'States_idStates',
        { integer: true, min: 1 }
    );
    if (stateResult.error) errors.push(stateResult.error);

    if (errors.length > 0) {
        return { errors };
    }

    const data: BatchInput = {
        Unit_Cost: unitCostResult.value!,
        Total_Quantity: totalQuantityResult.value!,
        Cost: costResult.value!,
        Weight_Batch: weightResult.value!,
        Age_Batch: ageResult.value!,
        Species_idSpecies: speciesResult.value!,
        States_idStates: stateResult.value!
    };

    return { data, errors };
}

// ---------- Controladores ----------

// GET /batches
export async function getBatches(req: Request, res: Response): Promise<void> {
    try {
        const batches = await getAllBatches();
        res.json(batches);
    } catch (error) {
        console.error('Error al obtener batches:', error);
        res.status(500).json({
        message: 'Error interno del servidor al obtener las batches.',
        error: (error as Error).message
        });
    }
}

// GET /batches/:id
export async function getBatchByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const { id: validId, error: idError } = validateIdParam(req.params.id);
        if (idError) {
        res.status(400).json({ message: idError });
        return;
        }

        const batch = await getBatchById(validId!);
        if (!batch) {
        res.status(404).json({ message: 'Batch no encontrada.' });
        return;
        }

        res.json(batch);
    } catch (error) {
        console.error('Error al obtener batch por ID:', error);
        res.status(500).json({
        message: 'Error interno del servidor al obtener la batch.',
        error: (error as Error).message
        });
    }
}

// POST /batches
export async function createBatchHandler(req: Request, res: Response): Promise<void> {
    try {
        const { data, errors } = validateBatchInput(req.body);

        if (errors.length > 0) {
        res.status(400).json({
            message: 'Datos de batch inválidos.',
            errors
        });
        return;
        }

        // Validar FKs
        const [speciesExists, stateExists] = await Promise.all([
        existsSpeciesById(data!.Species_idSpecies),
        existsStateById(data!.States_idStates)
        ]);

        if (!speciesExists) {
        res.status(400).json({ message: 'La especie indicada no existe.' });
        return;
        }

        if (!stateExists) {
        res.status(400).json({ message: 'El estado indicado no existe.' });
        return;
        }

        const newBatch = await createBatch(data!);
        res.status(201).json(newBatch);
    } catch (error) {
        console.error('Error al crear batch:', error);
        res.status(500).json({
        message: 'Error interno del servidor al crear la batch.',
        error: (error as Error).message
        });
    }
}

// PUT /batches/:id
export async function updateBatchHandler(req: Request, res: Response): Promise<void> {
    try {
        const { id: validId, error: idError } = validateIdParam(req.params.id);
        if (idError) {
        res.status(400).json({ message: idError });
        return;
        }

        const { data, errors } = validateBatchInput(req.body);
        if (errors.length > 0) {
        res.status(400).json({
            message: 'Datos de batch inválidos.',
            errors
        });
        return;
        }

        const exists = await getBatchById(validId!);
        if (!exists) {
        res.status(404).json({ message: 'Batch no encontrada.' });
        return;
        }

        // Validar FKs
        const [speciesExists, stateExists] = await Promise.all([
        existsSpeciesById(data!.Species_idSpecies),
        existsStateById(data!.States_idStates)
        ]);

        if (!speciesExists) {
        res.status(400).json({ message: 'La especie indicada no existe.' });
        return;
        }

        if (!stateExists) {
        res.status(400).json({ message: 'El estado indicado no existe.' });
        return;
        }

        const updated = await updateBatch(validId!, data!);
        if (!updated) {
        res.status(500).json({ message: 'No se pudo actualizar la batch.' });
        return;
        }

        const batchUpdated = await getBatchById(validId!);
        res.json(batchUpdated);
    } catch (error) {
        console.error('Error al actualizar batch:', error);
        res.status(500).json({
        message: 'Error interno del servidor al actualizar la batch.',
        error: (error as Error).message
        });
    }
}

// DELETE /batches/:id
export async function deleteBatchHandler(req: Request, res: Response): Promise<void> {
    try {
        const { id: validId, error: idError } = validateIdParam(req.params.id);
        if (idError) {
        res.status(400).json({ message: idError });
        return;
        }

        const exists = await getBatchById(validId!);
        if (!exists) {
        res.status(404).json({ message: 'Batch no encontrada.' });
        return;
        }

        const deleted = await deleteBatch(validId!);
        if (!deleted) {
        res.status(500).json({ message: 'No se pudo eliminar la batch.' });
        return;
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar batch:', error);
        res.status(500).json({
        message: 'Error interno del servidor al eliminar la batch.',
        error: (error as Error).message
        });
    }
}
