import { isValidObjectId } from "mongoose";


// we create this middleware for check if the product id is valid with the specific method isValidObjectId

export const checkId = (req, res, next)=>{

    const { id } = req.params

    if(!isValidObjectId(id)){

        res.status(404)
        throw new Error('Invalid ID')
    }
    next();
}