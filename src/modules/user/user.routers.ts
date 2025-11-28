import express from "express";
import { getUserController, createUserController, getUserByIdController, updateUserController, deleteUserController, loginController} from "./user.controller.ts";

const router = express.Router();

//rutas Users
router.get("/users", getUserController);
router.post("/users", createUserController);
router.get("/users/:id", getUserByIdController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);
router.post("/users/login", loginController);


export default router;