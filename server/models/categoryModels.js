import mongoose from "mongoose";


// same logic for user schema, claasic schema
const { Schema } = mongoose

const category = new Schema({


    name : {

        type : String,
        required : true,
        unique : true,
        trim : true,
        maxLength : 30
    }

},
{timestamps : true})


const Category = mongoose.model('categories', category)

export default Category