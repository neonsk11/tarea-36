import mongoose from "mongoose";

const reservaEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    lugar: {
        type: String,
        required: true,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFin: {
        type: Date,
        required: true,
    },
   /* horaInicio: {
        type: Number,
        min: 0,
        max: 23,  
    },
    horaFin:{
        type: Number,
        min: 0,
        max: 23,
    }*/
})

export const Reserva = mongoose.model("Reserva", reservaEsquema)