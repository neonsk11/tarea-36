import 'dotenv/config';
import { app } from "./app.js";
import { conectarDB } from './config/dataBase.js';

const {PUERTO} = process.env

console.log(PUERTO);

conectarDB()

app.listen(PUERTO, () => {
    console.log (`Escuchamos la app desde el puerto ${PUERTO}: http://localhost:${PUERTO}`)
    });
    