import { getSupplierCategory,CreateSupplierCategory,UpdateSupplierCategory,DeleteSupplierCategory } from "./Supplies_Category.model.ts";

import { validateSuppliesCategory } from "../helpers/validator.js";

import type { Response, Request } from "express";

export async function getSuppliesCategoryController(req: Request, res: Response) {
    try {
        validateSuppliesCategory(req);
        const suppliesCategory = await getSupplierCategory();
        res.status(200).send({
            status: "Success",
            data: suppliesCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function CreateSuppliesCategoryController(req: Request, res: Response) {
    try {
        const { Category_Name } = req.body;
        const newSuppliesCategory = await CreateSupplierCategory(Category_Name);
        res.status(201).send({
            status: "Success",
            data: newSuppliesCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}

export async function DeleteSuppliesCategoryController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedSuppliesCategory = await DeleteSupplierCategory(Number(id));
        res.status(200).send({
            status: "Success",
            data: deletedSuppliesCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}
export async function UpdateSuppliesCategoryController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { Category_Name } = req.body;
        const updatedSuppliesCategory = await UpdateSupplierCategory(Number(id), Category_Name);
        res.status(200).send({
            status: "Success",
            data: updatedSuppliesCategory,
        });
    } catch (e) {
        res.status(500).send({
            status: "Error",
            message: `Internal Server Error: ${e}`,
        });
    }
}