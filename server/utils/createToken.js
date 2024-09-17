import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVar.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (res , userId)=>{


    // we create the token with the userId if the first parameter is passed, it's only the id for the user
    // 2nd argument is the secret key, 3rd argument is the options
    const token = jwt.sign(
        {userId},
        ENV_VARS.JWT_SECRET,
        {expiresIn : '30d'},
        );

    // Configure the HttpCookie
    
    // We create the cookie with the method httpCookieOnly for secure
    // The cookie isn't avaible in the browser but only in the server
    // Usually all Javascript code it's avaible but using cookie isn't for secure

    // option 1 : httpOnly for security another person can't access the cookie
    // option 2 : secure only https and ssl can access the cookie and not http
    // option 3 : sameSite e.g if click in the link whivh send in another website the cookie will be not sent
    // option 4 : for the date of expiration 

    let options = {
        httpOnly : true,
        secure: process.env.NODE_ENV !== "development", 
        sameSite : "strict",
        maxAge : 30*24*60*60*1000
    };

    // In the res.cookie method I define the cookie with a name, I sent the token and the options
    res.cookie('jwt',token, options);
    
    return token

}

export default generateToken