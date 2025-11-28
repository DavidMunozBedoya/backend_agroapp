import dotenv from "dotenv";
dotenv.config();
import { Conexion } from './src/config/dbConexion.ts';
import express from "express";
import cors from "cors";

import userModule from "./src/modules/user/user.routers.ts"
import categorySpeciesModule from "./src/modules/species/species.router.ts"
import noveltyCategoriesModule from "./src/modules/Novelty_Categories/Novelty_Categories.routers.ts"
import suppliesCategoryModule from "./src/modules/Supplies_Category/Supplies_Category.routers.ts"
import noveltiesModule from "./src/modules/novelties/novelties.router.ts"
import batchesModule from "./src/modules/batches/batches.router.ts"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userModule);
app.use("/", categorySpeciesModule);
app.use("/", noveltyCategoriesModule);
app.use("/", suppliesCategoryModule);
app.use("/", noveltiesModule);
app.use("/", batchesModule);


Conexion();

app.listen(process.env.DB_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.DB_PORT}`);
});
