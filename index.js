import 'dotenv/config';
import { app } from "./app.js";
import { conectarDB } from './config/dataBase.js';


const PUERTO = Number(process.env.PUERTO) || 3003;
const enVercel = process.env.VERCEL === "1";

app.listen(PUERTO, () => {
  console.log(`Servidor activo en http://localhost:${PUERTO}`)
});
if (!enVercel) {
    await conectarDB();
    app.listen(PUERTO, () => {
        console.log(`Servidor activo en http://localhost:${PUERTO}`);
    });
}
 export default async function handler(peticion, respuesta) {
    try {
        await conectarDB();
        return app(peticion, respuesta);
    } catch (error) {
        console.error("Error conectando con MongoDB", error);
        return respuesta.status(500).json({
            mensaje: "No se pudo conectar con la base de datos",
        });
    }
 }
