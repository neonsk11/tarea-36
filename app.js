import rapido from "express"
import cors from "cors";
import { ReservaRuta } from "./rutas/ReservaRoutes.js";
export const app = rapido()

app.use (cors())
app.use(rapido.json())
app.use(rapido.urlencoded({extended: true}))


app.get("/", (peticion, respuesta) => {
respuesta.send("Hola 🐒")

})
 app.use("/reservas", ReservaRuta)