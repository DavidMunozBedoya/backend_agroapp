import type { Request, Response } from 'express';
import {
    getAllSpecies,
    getSpeciesById,
    getSpeciesByName,
    createSpecies,
    updateSpecies,
    deleteSpecies
} from './species.model.ts';
import type { SpeciesInput } from './species.model';

// ---------- Helpers de validación ----------

function validateIdParam(idParam: string): { id?: number; error?: string } {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return { error: 'El ID debe ser un número entero positivo.' };
    }
    return { id };
}

function validateSpeciesInput(body: any): { data?: SpeciesInput; errors: string[] } {
    const errors: string[] = [];
    let Specie_Name = '';

    if (!body || typeof body.Specie_Name === 'undefined') {
        errors.push('El campo Specie_Name es obligatorio.');
    } else if (typeof body.Specie_Name !== 'string') {
        errors.push('El campo Specie_Name debe ser una cadena de texto.');
    } else {
        Specie_Name = body.Specie_Name.trim();

        if (!Specie_Name) {
        errors.push('El campo Specie_Name no puede estar vacío.');
        }

        if (Specie_Name.length > 100) {
        errors.push('El campo Specie_Name no puede superar los 100 caracteres.');
        }
    }

    if (errors.length > 0) {
        return { errors };
    }

    return {
        data: { Specie_Name },
        errors
    };
}

// ---------- Controladores ----------

// GET /species
export async function getSpecies(req: Request, res: Response): Promise<void> {
    try {
        const species = await getAllSpecies();
        res.json(species);
    } catch (error) {
        console.error('Error al obtener especies:', error);
        res.status(500).json({
        message: 'Error interno del servidor al obtener las especies.',
        error: (error as Error).message
        });
    }
}

// GET /species/:id
export async function getSpeciesByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const { id: validId, error: idError } = validateIdParam(req.params.id);
        if (idError) {
        res.status(400).json({ message: idError });
        return;
        }

        const species = await getSpeciesById(validId!);
        if (!species) {
        res.status(404).json({ message: 'Especie no encontrada.' });
        return;
        }

        res.json(species);
    } catch (error) {
        console.error('Error al obtener especie por ID:', error);
        res.status(500).json({
        message: 'Error interno del servidor al obtener la especie.',
        error: (error as Error).message
        });
    }
}

// POST /species
export async function createSpeciesHandler(req: Request, res: Response): Promise<void> {
    try {
        const { data, errors } = validateSpeciesInput(req.body);

        if (errors.length > 0) {
        res.status(400).json({
            message: 'Datos de especie inválidos.',
            errors
        });
        return;
        }

        // Validar duplicados por nombre
        const existing = await getSpeciesByName(data!.Specie_Name);
        if (existing) {
        res.status(409).json({
            message: 'Ya existe una especie con ese nombre.',
            idSpecies: existing.idSpecies
        });
        return;
        }

        const newSpecies = await createSpecies(data!);
        res.status(201).json(newSpecies);
    } catch (error) {
        console.error('Error al crear especie:', error);
        res.status(500).json({
        message: 'Error interno del servidor al crear la especie.',
        error: (error as Error).message
        });
    }
}

// PUT /species/:id
export async function updateSpeciesHandler(req: Request, res: Response): Promise<void> {
    try {
        const { id: validId, error: idError } = validateIdParam(req.params.id);
        if (idError) {
        res.status(400).json({ message: idError });
        return;
        }

        const { data, errors } = validateSpeciesInput(req.body);
        if (errors.length > 0) {
        res.status(400).json({
            message: 'Datos de especie inválidos.',
            errors
        });
        return;
        }

        const exists = await getSpeciesById(validId!);
        if (!exists) {
        res.status(404).json({ message: 'Especie no encontrada.' });
        return;
        }

        // Validar duplicados por nombre (que no sea la misma especie)
        const otherWithSameName = await getSpeciesByName(data!.Specie_Name);
        if (otherWithSameName && otherWithSameName.idSpecies !== validId) {
        res.status(409).json({
            message: 'Ya existe otra especie con ese nombre.',
            idSpecies: otherWithSameName.idSpecies
        });
        return;
        }

        const updated = await updateSpecies(validId!, data!);
        if (!updated) {
        res.status(500).json({ message: 'No se pudo actualizar la especie.' });
        return;
        }

        const speciesUpdated = await getSpeciesById(validId!);
        res.json(speciesUpdated);
    } catch (error) {
        console.error('Error al actualizar especie:', error);
        res.status(500).json({
        message: 'Error interno del servidor al actualizar la especie.',
        error: (error as Error).message
        });
    }
}

// DELETE /species/:id
export async function deleteSpeciesHandler(req: Request, res: Response): Promise<void> {
    try {
        const { id: validId, error: idError } = validateIdParam(req.params.id);
        if (idError) {
        res.status(400).json({ message: idError });
        return;
        }

        const exists = await getSpeciesById(validId!);
        if (!exists) {
        res.status(404).json({ message: 'Especie no encontrada.' });
        return;
        }

        const deleted = await deleteSpecies(validId!);
        if (!deleted) {
        res.status(500).json({ message: 'No se pudo eliminar la especie.' });
        return;
        }

        res.status(204).send(); // sin contenido
    } catch (error) {
        console.error('Error al eliminar especie:', error);
        res.status(500).json({
        message: 'Error interno del servidor al eliminar la especie.',
        error: (error as Error).message
        });
    }
}
