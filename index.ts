import dotenv from "dotenv";
dotenv.config();
import { Conexion } from './src/config/dbConexion.ts';
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

Conexion();

app.listen(process.env.DB_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.DB_PORT}`);
});
