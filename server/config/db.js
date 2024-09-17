import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVar.js";



// Thanks to the folder that we create enVar, we don't need to use dotenv.config() and process.env

// we connect the mongoDB database to our app
const connectDB = async ()=>{

    try {


        // we connect the database we log
        await mongoose.connect(ENV_VARS.DATABASE_URL);
        console.log("database is connected");
        
    } catch (error) {
        

        // if there is an error we log it and we stop the running of the app
        console.error(`message: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB