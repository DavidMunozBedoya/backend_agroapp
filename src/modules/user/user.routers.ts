import express from "express";
import { getUserController } from "./user.controller.ts";

const router = express.Router();

//rutas Users
router.get("/users", getUserController);


export default router;
