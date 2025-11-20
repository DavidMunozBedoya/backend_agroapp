import express from "express";
import { getSuppliesCategoryController,CreateSuppliesCategoryController,UpdateSuppliesCategoryController,DeleteSuppliesCategoryController } from "./Supplies_Category.controller.ts";

const router = express.Router();
//rutas Supplies_Category
router.get("/supplies-category", getSuppliesCategoryController);
router.post("/supplies-category", CreateSuppliesCategoryController);
router.put("/supplies-category/delete/:id", DeleteSuppliesCategoryController);
router.put("/supplies-category/:id", UpdateSuppliesCategoryController);
export default router;