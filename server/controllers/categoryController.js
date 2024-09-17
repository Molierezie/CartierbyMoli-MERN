import express from "express";
import Category from "../models/categoryModels.js";
import asyncHandler from "express-async-handler"


// ------------------------------------------------------------------ //
// ------------------------------ CREATE ---------------------------- //
// ------------------------------------------------------------------ //

export const createCategory =
asyncHandler(

    async (req, res )=>{


        const { name } = req.body

         // We check if the user send a name
        if(!name){

            res.status(401)
            throw new Error("A name is required")
        }
        

         // We search if a name of the category already exist in the database
        const category = await Category.findOne({name})
        
        if(category){
            res.status(401)
            throw new Error("Category already exist")
        }


        // We check if the name is not empty or with whitespace
        if (!name.trim()){
            res.status(401)
            throw new Error("Please make sure the name is not empty or with whitespace")
        }
            
        
        // We create a new category with the method new Collection
        const newCategory = new Category({

            name : name
    
        })

        // We save the new category
        await newCategory.save()

        const displayFront = await Category.findById(newCategory._id).select("name")
        
        res.status(200).json(displayFront)


    }
)


// ------------------------------------------------------------------ //
// ------------------------------ UPDATE ---------------------------- //
// ------------------------------------------------------------------ //


export const updateCategory =
asyncHandler(
    async(req, res)=>{


        // Get the specifiic Category with the ID
        const { id } = req.params

        const { name } = req.body

         // We check if the user send a name
        if(!name){

            res.status(400)
            throw new Error('A name is required for update the category')
        }

         // We looking for the category in the database
        const category = await Category.findById(id)

         // check if the category exists
         if(!category){
            res.status(400)
            throw new Error(" Category not existing ")
        }


        // the operator || take the first truthy response
        category.name = name || category.name
        
         // we update with the method updateOne from mongoDB
         // We can also use FindByIdAndUpdate( { _id : id } )

        // await category.updateOne(category._id)

        await category.save()

        res.status(200).json(category)
    }
)



// ------------------------------------------------------------------ //
// ------------------------------ DELETE ---------------------------- //
// ------------------------------------------------------------------ //


export const deleteCategory =
asyncHandler(
    async(req, res)=>{

        try {

              // Get the specifiic Category with the ID using destructuring
            const { id } = req.params

            const category = await Category.findById(id)

              // Delete category with the method deleteOne (I can delete with all field no imperatively with id)
            // await Category.DeleteOne({ name : category.name})
            await Category.findByIdAndDelete(id)
    
            res.status(200).json(category.name)

        } catch (error) {
            res.status(400)
            throw new Error(error)
        }

         
    })
       


// ------------------------------------------------------------------ //
// -------------------- GET ALL CATEGORIES ------------------------- //
// ------------------------------------------------------------------ //

export const getAllCategory =
asyncHandler(
    async(req, res)=>{

        const categories = await Category.find({})

        if(!categories){

            res.status(400)
            throw new Error("Categories not found")
        }

        res.status(200).json(categories)
    }
)


// ------------------------------------------------------------------ //
// -------------------- GET ONE CATEGORY ------------------------- //
// ------------------------------------------------------------------ //


export const getOneCategory  =
asyncHandler(
    async(req, res)=>{
   
        const { id } = req.params

        const category = await Category.findById(id)

        if(!category){

            res.status(400)
            throw new Error("Category not found")
        }

        res.status(200).json(category)
    }
)