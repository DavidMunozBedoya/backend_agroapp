import { Conexion } from '../../config/dbConexion.ts';

export interface Supplies {
    idSupplies: number;
    Supplie_Name: string;
    Supplies_Category_idSupplies_Category: number;
}

export interface SuppliesInput {
    Supplie_Name: string;
    Supplies_Category_idSupplies_Category: number;
}

// Obtener todos los suministros
export async function getAllSupplies(): Promise<Supplies[]> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM supplies'
        );
        return rows as Supplies[];
    } catch (error) {
        console.error('Error en getAllSupplies:', error);
        throw new Error('Error al obtener los suministros');
    } finally {
        await connection.end();
    }
}

// Obtener suministro por ID
export async function getSuppliesById(id: number): Promise<Supplies | null> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM supplies WHERE idSupplies = ?',
            [id]
        );
        const supplies = (rows as Supplies[])[0];
        return supplies ?? null;
    } catch (error) {
        console.error('Error en getSuppliesById:', error);
        throw new Error('Error al obtener el suministro');
    } finally {
        await connection.end();
    }
}

// Obtener suministro por nombre
export async function getSuppliesByName(name: string): Promise<Supplies | null> {
    const connection = await Conexion();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM supplies WHERE Supplie_Name = ?',
            [name]
        );
        const supplies = (rows as Supplies[])[0];
        return supplies ?? null;
    } catch (error) {
        console.error('Error en getSuppliesByName:', error);
        throw new Error('Error al obtener el suministro por nombre');
    } finally {
        await connection.end();
    }
}

// (Removed) getSuppliesByBatchId: Batches relationship removed from DB

// Crear nuevo suministro
export async function createSupplies(data: SuppliesInput): Promise<number> {
    const connection = await Conexion();
    try {
        const [result]: any = await connection.query(
            'INSERT INTO supplies (Supplie_Name, Supplies_Category_idSupplies_Category) VALUES (?, ?)',
            [data.Supplie_Name, data.Supplies_Category_idSupplies_Category]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error en createSupplies -', error);
        throw new Error('Error al crear el suministro');
    } finally {
        await connection.end();
    }
}

// Actualizar suministro
export async function updateSupplies(id: number, data: Partial<SuppliesInput>): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [result]: any = await connection.query(
            'UPDATE supplies SET Supplie_Name = COALESCE(?, Supplie_Name), Supplies_Category_idSupplies_Category = COALESCE(?, Supplies_Category_idSupplies_Category) WHERE idSupplies = ?',
            [data.Supplie_Name || null, data.Supplies_Category_idSupplies_Category || null, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error en updateSupplies:', error);
        throw new Error('Error al actualizar el suministro');
    } finally {
        await connection.end();
    }
}

// Eliminar suministro
export async function deleteSupplies(id: number): Promise<boolean> {
    const connection = await Conexion();
    try {
        const [result]: any = await connection.query(
            'DELETE FROM supplies WHERE idSupplies = ?',
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error en deleteSupplies:', error);
        throw new Error('Error al eliminar el suministro');
    } finally {
        await connection.end();
    }
}
