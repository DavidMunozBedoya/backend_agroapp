import  express  from "express";
import { getNoveltyCategoriesController, CreateNoveltyCategoryController, DeleteNoveltyCategoryController, UpdateNoveltyCategoryController } from "./Novelty_Categories.controller.ts";

const router = express.Router();

//rutas Novelty_Categories
router.get("/novelty-categories", getNoveltyCategoriesController);
router.post("/novelty-categories", CreateNoveltyCategoryController);
router.put("/novelty-categories/delete/:id", DeleteNoveltyCategoryController);
router.put("/novelty-categories/:id", UpdateNoveltyCategoryController);

export default router;