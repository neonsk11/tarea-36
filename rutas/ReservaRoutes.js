import { Router } from "express";
import { mostrarTodo, reservar, detalleReserva, quitarReserva } from "../controladores/ReservaController.js";

export const ReservaRuta = Router()



ReservaRuta.get ("/", mostrarTodo)
ReservaRuta.get ("/:id", detalleReserva)
ReservaRuta.post ("/", reservar)
ReservaRuta.delete ("/:id", quitarReserva)