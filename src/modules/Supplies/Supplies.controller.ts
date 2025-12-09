import type { Request, Response } from 'express';
import {
    getAllSupplies,
    getSuppliesById,
    getSuppliesByName,
    createSupplies,
    updateSupplies,
    deleteSupplies
} from './Supplies.model.ts';
import type { SuppliesInput } from './Supplies.model';

// ---------- Helpers de validación ----------

function validateIdParam(idParam: string): { id?: number; error?: string } {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return { error: 'El ID debe ser un número entero positivo.' };
    }
    return { id };
}

function validateSuppliesInput(body: any): { data?: SuppliesInput; errors: string[] } {
    const errors: string[] = [];
    if (!body.Supplie_Name) errors.push('Supplie_Name es obligatorio');
    if (!body.Supplies_Category_idSupplies_Category) errors.push('Supplies_Category_idSupplies_Category es obligatorio');
    if (errors.length > 0) return { errors };

    const dataProcesada = {
        Supplie_Name: String(body.Supplie_Name).trim(),
        Supplies_Category_idSupplies_Category: Number(body.Supplies_Category_idSupplies_Category)
    };

    return { data: dataProcesada, errors: [] };
}

// ---------- GET /supplies ----------
export async function getSupplies(req: Request, res: Response): Promise<void> {
    try {
        const supplies = await getAllSupplies();
        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Error en el servidor' });
    }
}

// ---------- GET /supplies/:id ----------
export async function getSuppliesByIdHandler(req: Request, res: Response): Promise<void> {
    const { error, id } = validateIdParam(req.params.id);

    if (error) {
        res.status(400).json({ error });
        return;
    }

    try {
        const supplies = await getSuppliesById(id!);

        if (!supplies) {
            res.status(404).json({ error: 'Suministro no encontrado' });
            return;
        }

        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Error en el servidor' });
    }
}

// ---------- GET /batches/:batchId/supplies ----------
export async function getSuppliesByBatchIdHandler(req: Request, res: Response): Promise<void> {
    res.status(404).json({ error: 'Esta ruta ya no está disponible: la relación con Batches fue removida.' });
}

// ---------- POST /supplies ----------
export async function createSuppliesHandler(req: Request, res: Response): Promise<void> {
    const { data, errors } = validateSuppliesInput(req.body);

    if (errors.length > 0) {
        console.log('DEBUG: Errores de validación:', errors);
        res.status(400).json({ errors });
        return;
    }

    try {
        // Verificar si el suministro ya existe
        const existingSupplies = await getSuppliesByName(data!.Supplie_Name);
        if (existingSupplies) {
            res.status(409).json({ error: 'El suministro ya existe' });
            return;
        }

        const id = await createSupplies(data!);
        res.status(201).json({ id, ...data });
    } catch (error) {
        console.error('DEBUG: Error en POST /supplies:', error);
        res.status(500).json({ error: (error as Error).message || 'Error en el servidor' });
    }
}

// ---------- PUT /supplies/:id ----------
export async function updateSuppliesHandler(req: Request, res: Response): Promise<void> {
    const { error, id } = validateIdParam(req.params.id);

    if (error) {
        res.status(400).json({ error });
        return;
    }

    try {
        const supplies = await getSuppliesById(id!);

        if (!supplies) {
            res.status(404).json({ error: 'Suministro no encontrado' });
            return;
        }

        const { data, errors } = validateSuppliesInput(req.body);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        const success = await updateSupplies(id!, data!);

        if (!success) {
            res.status(500).json({ error: 'No se pudo actualizar el suministro' });
            return;
        }

        const updatedSupplies = await getSuppliesById(id!);
        res.status(200).json(updatedSupplies);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Error en el servidor' });
    }
}

// ---------- DELETE /supplies/:id ----------
export async function deleteSuppliesHandler(req: Request, res: Response): Promise<void> {
    const { error, id } = validateIdParam(req.params.id);

    if (error) {
        res.status(400).json({ error });
        return;
    }

    try {
        const supplies = await getSuppliesById(id!);

        if (!supplies) {
            res.status(404).json({ error: 'Suministro no encontrado' });
            return;
        }

        const success = await deleteSupplies(id!);

        if (!success) {
            res.status(500).json({ error: 'No se pudo eliminar el suministro' });
            return;
        }

        res.status(200).json({ message: 'Suministro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Error en el servidor' });
    }
}
