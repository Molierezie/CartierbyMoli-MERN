import mongoose from "mongoose";

const { schema } = mongoose

const test = new schema ({

    // name : { type : String, required : true},

    // password : { type : String, required : true},

    image : { type : String}
},

{

    timestamps : true
})

const TestModel = mongoose.model('Test', test)

export default TestModel