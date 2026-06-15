import {connect} from "mongoose";
import "dotenv/config";

export const conectarDB = async () => {
    try {
        const { MONGO_URI } = process.env

        await connect(MONGO_URI)
        console.log("conexion a mongoDB Atlas correctoS ");

    } catch (error) {
        console.error("Lo siento, tenemos un error:", error.message);
        process.exit(1);
    }
}
