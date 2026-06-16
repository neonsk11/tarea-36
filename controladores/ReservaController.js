import * as z from "zod"
import { Reserva } from "./../modelos/ReservaModelo.js";
const ReservaEsquema = z.object(
    {
        lugar: z.string(),
        solicitante:z.string(),
        fecha_ini:z.iso.date(),
        fecha_fin:z.iso.date(),
        hora_ini:z.string(),
        hora_fin:z.string(),   
    }
)
const IdentificadorEsquema = z.number()

let reservas = [
    {
    id:1,
    nombre: "nombreLocal",
    lugar: "LugarLocal",
    fechaInicio:"diainicio",
    fechaFin:"diaFin",
    horaInicio: "minutoInicio",
    horaFin: "minutoFin",
 }
]
export const mostrarTodo = async function (peticion, respuesta) {
 //respuesta.send(reservas)
 try {
    const reservas = await Reserva.find({})
    respuesta.send(reservas)
 } catch (error) {
     console.error("amigo, tenemos un problema", error);
     respuesta.status(500).json({
        mensaje: "El servidor no responde, vuelva en un minuto"
    })

 }
}
export async function reservar (peticion, respuesta) {
    const {
        lugar,
        solicitante,
        fecha_ini,
        fecha_fin,
        hora_ini,
        hora_fin,
     } = peticion.body

try {
         const nuevaReserva = new Reserva ({
        lugar,
        nombre: solicitante,
        fechaInicio: fecha_ini,
        fechaFin: fecha_fin,
     })
         const resultado = await nuevaReserva.save()
         respuesta.status(201).json(resultado)
} catch (error) {
    console.error("Hubo una falla con los datos de reserva", error);
       
    let faltantes = []

    const objetoPrincipal = error.errors
    for (const clave in objetoPrincipal){
        faltantes.push(`Encontrado: ${objetoPrincipal[clave]}`)
    }
     /*error.errors.lugar.path */
    respuesta.status(403).json({sms: "probablemente hubo una falla", algo: faltantes})
}

    /* const datosComprobar = {
        lugar,
        solicitante,
        fecha_ini,
        fecha_fin,
        hora_ini,
        hora_fin
     }

     const datos = {
        lugar: lugar,
        nombre: solicitante,
        fechaInicio: fecha_ini,
        fechaFin: fecha_fin,
        horaInicio: hora_ini,
        horaFin: hora_fin
     }
     try{
          ReservaEsquema.parse(datosComprobar)
     
     reservas.push({
         id: reservas.length + 1,
        ...datos
     })

     respuesta.status(201).json(
        {
            "mensaje": "Reserva creada",
            "datos": {
                solicitante: solicitante,
                lugar,
                id: reservas.length

            }
        }
     )
} catch (error) {
            const detalles = JSON.parse(error.message)

            const detallesUsar = detalles.map(err => ({
                campo: err.path.join('.'),
                mensaje: err.message
            }) )
             respuesta.status(400).json(
        {
            "mensaje": "Peticion incompleta",
            "datos": {
             errores: detallesUsar

            }
        }
     ) 
     }*/
    } 

export const detalleReserva = async (peticion, respuesta) => {
    const { id } = peticion.params
  /*  IdentificadorEsquema.parse(parseInt(id))
   
   const resultado = reservas.filter((reserva) => id == reserva.id)
   respuesta.send(resultado)*/
   try {
    const reserva = await Reserva.find({_id: id})
    respuesta.send(reserva)
 } catch (error) {
     console.error("amigo, tenemos un problema", error);
     respuesta.status(404).json({
        mensaje: "La reserva no fue encontrada"
    })

 }
} 
export const quitarReserva = async (peticion, respuesta) => {
const{id} = peticion.params

await Reserva.deleteOne({_id: id})
respuesta.send({
    mensaje: `reserva ${id} eliminada`
})
/* try {
    const posicion = reservas.findIndex((reserva) => id == reserva.id)
    IdentificadorEsquema.parse(parseInt(id))
reservas.splice(posicion, 1) 
   respuesta.send(
    {
        mensaje: `reserva ${id} eliminada`
    }
   )
    
} catch (error) {
                const detalles = JSON.parse(error.message)

            const detallesUsar = detalles.map(err => ({
                campo: err.path.join('.'),
                mensaje: err.message
            }) )
             respuesta.status(400).json(
        {
            "mensaje": "Peticion incorrecta",
            "datos": {
             errores: detallesUsar

            }
        }
     )
} */

} 
export const actualizarReserva = async (peticion, respuesta) => {
    const{id} = peticion.params
    try {
        const {
        lugar,
        solicitante,
        fecha_ini,
        fecha_fin,
        hora_ini,
        hora_fin,
     } = peticion.body
        await Reserva.updateOne({_id: id}, {$set:{
           lugar: lugar,
           nombre: solicitante,
           fechaInicio: fecha_ini,
           fechaFin: fecha_fin
        }} )
           respuesta.send(
    {
        mensaje: `reserva ${id} modificada`
    }
   )
    } catch (error) {
        
    }
/*
try{
        IdentificadorEsquema.parse(parseInt(id))
    const posicion = reservas.findIndex((reserva) => id == reserva.id)

const {
        lugar,
        solicitante,
        fecha_ini,
        fecha_fin,
        hora_ini,
        hora_fin,
     } = peticion.body

reservas.splice(posicion, 1, {
    id: parseInt(id),
    lugar,
    nombre: solicitante, 
    fechaInicio: fecha_ini,
    fechaFin: fecha_fin,
    horaInicio: hora_ini,
    horaFin: hora_fin
}
) 
   respuesta.send(
    {
        mensaje: `reserva ${id} modificada`
    }
   )

} catch (error){
             const detalles = JSON.parse(error.message)

            const detallesUsar = detalles.map(err => ({
                campo: err.path.join('.'),
                mensaje: err.message
            }) )
             respuesta.status(400).json(
        {
            "mensaje": "Peticion incorrecta",
            "datos": {
             errores: detallesUsar

            }
        }
     )
}*/

}