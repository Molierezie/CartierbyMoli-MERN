import dotenv from "dotenv";


// We store the entier sensitive variable from dotevn in this function now
// in I use this function I don't need to use dotenv.config() and 'process.envin each file

dotenv.config();

export const ENV_VARS = {

    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    CLOUDINARY_NAME : process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET
 
}
