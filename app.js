import rapido from "express"
import cors from "cors";
import { ReservaRuta } from "./rutas/ReservaRoutes.js";
import {MongoClient, ServerApiVersion} from "mongodb"
import { conectarDB } from "./config/dataBase.js";

export const app = rapido()


app.use (cors())
app.use(rapido.json())
app.use(rapido.urlencoded({extended: true}))

conectarDB()

app.get("/", (peticion, respuesta) => {
respuesta.send("Hola 🐒")

})
 app.use("/reservas", ReservaRuta)

 app.get("/mongo", async (peticion, respuesta) => {
    const uri = "mongodb://localhost:27017/tarea36"
 if (!uri){
    return respuesta.status(500).json({error: "MONGO_URI no definida"})
 }

 const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
 });
try {
    await client.connect();
    await client.db("test").command({ ping: 1 });
    const reservas = await client.db("test").collection("reservas").find({}).toArray();
    respuesta.json({
        mensaje: "Conexión existosa a MongoDB",
        reservas
    });
} catch (error) {
    console.error("Error en /mongo:", error);
    respuesta.status(500).json({ error: error.message });
} finally {
    await client.close();
}
})

export default app

