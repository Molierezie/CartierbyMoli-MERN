import mongoose from "mongoose";    



// we use the descruting syntax for more readable code

const { Schema } = mongoose;


// we create a classci schema for the user

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        minlenght : 2,
        maxlenght : 20,
      
    },
    email : {
        type : String,
        required : true,
        unique : true,

    },
    password : {
        type : String,
        required : true
    },
    
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
},

{timestamps : true} // The utility of timestamps is to automatically generate createdAt and updatedAt 

);


const User = mongoose.model("Users", userSchema);

export default User
