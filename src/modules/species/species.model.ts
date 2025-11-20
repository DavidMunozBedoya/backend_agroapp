import { Conexion } from '../../config/dbConexion.ts';

export interface Species {
    idSpecies: number;
    Specie_Name: string;
}

export interface SpeciesInput {
  Specie_Name: string;
}

// Obtener todas las especies
export async function getAllSpecies(): Promise<Species[]> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        'SELECT * FROM species'
        );
        return rows as Species[];
    } catch (error) {
        console.error('Error en getAllSpecies:', error);
        throw new Error('Error al obtener las especies');
    } finally {
        await connection.end();
    }
}

// Obtener especie por ID
export async function getSpeciesById(id: number): Promise<Species | null> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        'SELECT idSpecies, Specie_Name FROM species WHERE idSpecies = ?',
        [id]
        );
        const species = (rows as Species[])[0];
        return species ?? null;
    } catch (error) {
        console.error('Error en getSpeciesById:', error);
        throw new Error('Error al obtener la especie');
    } finally {
        await connection.end();
    }
}

// Obtener especie por nombre (para validar duplicados)
export async function getSpeciesByName(name: string): Promise<Species | null> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
        'SELECT idSpecies, Specie_Name FROM species WHERE Specie_Name = ?',
        [name]
        );
        const species = (rows as Species[])[0];
        return species ?? null;
    } catch (error) {
        console.error('Error en getSpeciesByName:', error);
        throw new Error('Error al buscar especie por nombre');
    } finally {
        await connection.end();
    }
}

// Crear nueva especie
export async function createSpecies(data: SpeciesInput): Promise<Species> {
    const connection = await Conexion();
    try {
        const [result] = await connection.query(
        'INSERT INTO species (Specie_Name) VALUES (?)',
        [data.Specie_Name]
        );

        const insertResult = result as any;

        return {
        idSpecies: insertResult.insertId,
        Specie_Name: data.Specie_Name
        };
    } catch (error) {
        console.error('Error en createSpecies:', error);
        throw new Error('Error al crear la especie');
    } finally {
        await connection.end();
    }
}

// Actualizar especie
export async function updateSpecies(
    id: number,
    data: SpeciesInput
    ): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [result] = await connection.query(
        'UPDATE species SET Specie_Name = ? WHERE idSpecies = ?',
        [data.Specie_Name, id]
        );

        const updateResult = result as any;
        return updateResult.affectedRows > 0;
    } catch (error) {
        console.error('Error en updateSpecies:', error);
        throw new Error('Error al actualizar la especie');
    } finally {
        await connection.end();
    }
}

// Eliminar especie
export async function deleteSpecies(id: number): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [result] = await connection.query(
        'DELETE FROM species WHERE idSpecies = ?',
        [id]
        );

        const deleteResult = result as any;
        return deleteResult.affectedRows > 0;
    } catch (error) {
        console.error('Error en deleteSpecies:', error);
        throw new Error('Error al eliminar la especie');
    } finally {
        await connection.end();
    }
}
