import mongoose, {connect} from "mongoose";
import "dotenv/config";

mongoose.set("bufferCommands", false)

const estadoConexionGlobal = globalThis.__mongooseEstado ?? {
  conexion: null,
  promesa: null,
};

globalThis.__mongooseEstado = estadoConexionGlobal;

export const conectarDB = async () => {
    /*try {
        const { MONGO_URI } = process.env

        await connect(MONGO_URI)
        console.log("conexion a mongoDB Atlas correctoS ");

    } catch (error) {
        console.error("Lo siento, tenemos un error:", error.message);
        process.exit(1);
    }*/
   if (
    estadoConexionGlobal.conexion && 
    mongoose.connection.readyState === 1
   ){
    return estadoConexionGlobal.conexion;
   }

   const MONGO_URI = process.env.MONGO_URI;

   if (!MONGO_URI){
    throw new Error("La variable de entorno MONGO_URI no esta definida");
   }
   estadoConexionGlobal.promesa = null;
   
   estadoConexionGlobal.promesa = mongoose
   .connect(MONGO_URI, {
    dbName: "test",
    serverSelectionTimeoutMS: 25000,
    socketTimeoutMS: 45000,
    connectTimeoutMS:15000,
   })
   .catch((error) => {
    estadoConexionGlobal.promesa = null;
    estadoConexionGlobal.conexion = null;
    throw error;
   });

   estadoConexionGlobal.conexion = await estadoConexionGlobal.promesa;
   return estadoConexionGlobal.conexion;
};
