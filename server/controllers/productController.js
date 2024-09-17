import Product from "../models/productModels.js";
import Category from "../models/categoryModels.js";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";





// ----------------------------------------------------------------- //
// ------------------------ CREATE PRODUCT ------------------------ //
// ----------------------------------------------------------------- //

export const createProduct = asyncHandler(

    async(req, res)=>{

        try {

            
          // retrieve the product from the form in the front-end, we can use a form and extracr
          // the req.fields and req.files because formidable middleware handle in index.js
        
            const { name, description, quantity, category, price, brand } = req.fields

            // we store the image in let variable because we reuse it after for cloudinary
            let { image } = req.fields

            console.log(req.fields);


             // as we have lot of fields we use swtch statement for handle error instead if/else 
            switch (true) {
                case !name:
                  return res.json({ error: "Name is required" });
                case !brand:
                  return res.json({ error: "Brand is required" });
                case !description:
                  return res.json({ error: "Description is required" });
                case !price:
                  return res.json({ error: "Price is required" });
                case !category:
                  return res.json({ error: "Category is required" });
                case !quantity:
                  return res.json({ error: "Quantity is required" });
                  case !image:
                    return res.json({ error: "image is required" });
              }
              

            const productExist = await Product.findOne({name})

            if(productExist){
                res.status(400)
                throw new Error("Product already exist")
            }

            if (image) {



        // we check if the user have already a photo because otherwise if I try to set a new there will be a problem
        // so we destroy the image and after we add the new one

              if (product.image) {

                await cloudinary.uploader.destroy(product.image.split("/").pop().split(".")[0])
                
              }

              const uploadedResponse = await cloudinary.uploader.upload(image); // here I can add more options if I want

              // If the response is successful from Cloudinary it retunr an object secure_url 
              image = uploadedResponse.secure_url;
            }
        
            
             // we have many fields so we use rest parameters
            const addProduct = new Product({...req.fields, image})


            // we save the new product in the database 
            await addProduct.save()

            res.status(200).json(`${addProduct} is created`)



        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)




// ----------------------------------------------------------------- //
// ------------------------ UPDATE PRODUCT ------------------------ //
// ----------------------------------------------------------------- //

export const updateProduct = asyncHandler(

    async(req, res)=>{

        try {

            
          // We retrieve a specific produit from the url from the front-end

            const { id } = req.params

            const product = await Product.findById(id)
        

             // Same Logic createProduct

            const { name, description, quantity, category, price, brand } = req.fields
            let { image } = req.fields

            console.log(req.fields);

            switch (true) {
                case !name:
                  return res.json({ error: "Name is required" });
                case !brand:
                  return res.json({ error: "Brand is required" });
                case !description:
                  return res.json({ error: "Description is required" });
                case !price:
                  return res.json({ error: "Price is required" });
                case !category:
                  return res.json({ error: "Category is required" });
                case !quantity:
                  return res.json({ error: "Quantity is required" });
                  case !image:
                    return res.json({ error: "image is required" });
              }



              // same logic createProduct
              
              if(image){

                if (product.image) {

                  await cloudinary.uploader.destroy(product.image.split("/").pop().split(".")[0])
                  
                }

                const uploadedResponse = await cloudinary.uploader.upload(image)
                image = uploadedResponse.secure_url
              
          
            // update product with the method findByIdAndUpdate
            // 1st argument : id = specific product
            // 2nd argument : the fields we want to update
            // 3rd argument : new true for returning the new product

            const updateProduct = await Product.findByIdAndUpdate(

                id,
                { ...req.fields, image },
                { new: true }
            )

            await updateProduct.save()
            
            res.status(200).json(`${updateProduct} is updated`)


        } 

      }
        catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)




// ----------------------------------------------------------------- //
// ------------------------- DELETE PRODUCT ------------------------ //
// ----------------------------------------------------------------- //



export const deleteProduct = asyncHandler(

    async(req, res)=>{

        try {

            
          // Same Logic updateProduct here we don't need to th eentiere field we only need to delete with a speicifc id
            const { id } = req.params

            const displayRes = await Product.findById(id).select("name")

            await Product.findByIdAndDelete(id)

       
            res.status(200).json(`${displayRes} is deleted`)


        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)






// ----------------------------------------------------------------- //
// ----------------------- GET ONE PRODUCT ------------------------ //
// ----------------------------------------------------------------- //


export const fetchOneProduct = asyncHandler(

    async(req, res)=>{

        try {


          // same logic req params for specific id
            const { id } = req.params

            const product = await Product.findById(id)

            if(!product){

                res.status(400)
                throw new Error("Product not found")
            }
       
            return res.status(200).json(product)


        } catch (error) {
            res.status(400)
            throw new Error(error)
            
        }
    }
)



// ------------------------------------------------------------------------- //
// ---------------------------- GET ALL PRODUCTS  -------------------------- //
// ------------------------------------------------------------------------- //


export const getProducts = asyncHandler(

  async(req, res)=>{

      try {

          // we use some otpions for get product 
          // populate because when we get the product we want to get the category
          // filter for have the most recent product on top
          const product = await Product.find({}).populate({ path: 'category', select : 'name' }).sort({createdAt : -1});

          if(!product){

              res.status(500)
              throw new Error("Products not found");
          }
     
          return res.status(200).json(product)


      } catch (error) {
          res.status(400)
          throw new Error(error)
          
      }
  }
)



// ------------------------------------------------------------------------------- //
// -------------------------- CREATE A REVIEW FOR PRODUCT ------------------------ //
// ------------------------------------------------------------------------------- //


export const addProductReview = asyncHandler(

  async(req, res)=>{
    
    try{


      // we search the rating and comment from the front

      const { rating, comment } = req.body

       // we search a specific product by id
      const { id } = req.params
      

      const product = await Product.findById(id)



      // we create a speicifc function for check if the user has already add a review for the specific product
      if(product){

        // we convert to String because we can't compare ObjectId
        const alreadyReview = product.reviews.find( (r)=> r.user.toString() === req.user._id.toString())

        if(alreadyReview){

          res.status(400)
          throw new Error('Product already reviewed')
        }


        // if the user hasn't already reviewed we add the review we the property in the model review
        const review = {

          name : req.user.username,
          rating : Number(rating),
          comment,
          user : req.user._id
        }

        // after we add the review we push it in the reviews array in the product model
        product.reviews.push(review)
        
        // in the product model for the length of the review we use the method  .length we all reviews
        product.numReviews = product.reviews.length;


        // for the average as a calcul we additional all the revies and we divide the length of the reviews
        product.rating = product.reviews.reduce( (acc, item) => item.rating + acc, 0) / product.reviews.length;


         // We save all these changes in the model for the product
        await product.save()

        res.status(201).json({ message : 'Review added' })

      }else{

        res.status(404)
        throw new Error('Product not found')
      }

    }catch(err){

      console.error(err)
      res.status(500)
      throw new Error('Error')
    }
  }
)



// ----------------------------------------------------------------------- //
// ----------------------- GET ONLY 5 TOP PRODUCTS ------------------------ //
// ----------------------------------------------------------------------- //


export const fetchTopProduct = asyncHandler(
  async(req, res)=>{

    try{

      // for get only the top product we use the filtrer with sort method and we limit to the first 3 product on thte top
       const topProduct = await Product.find({}).sort({ rating : -1}).limit(3)

       res.status(200).json(topProduct)

    }catch(err){

      res.status(400)
      throw new Error('an error occurs')
    }
  }
)




// --------------------------------------------------------------------------- //
// ----------------------- GET ONLY 5 LAST NEW PRODUCT ------------------------ //
// ------------------------------------------------------------------------- //



export const fetchNewProduct = asyncHandler(
  async(req, res)=>{

    try{

        // same logic for the topProduct we can also sort with the property createdAt
       const newProduct = await Product.find({}).sort({ _id : -1}).limit(5)

       res.status(200).json(newProduct)

    }catch(err){

      res.status(400)
      throw new Error('an error occurs')
    }
  }
)





// --------------------------------------------------------------------------- //
// ----------------------- GET ONLY 5 LAST NEW PRODUCT ------------------------ //
// ------------------------------------------------------------------------- //



export const fetchBrandLove = asyncHandler(

  async(req,res)=>{



      // we get the product of the collection with a speciifc brand using the method $in inside the request ans we limit to the first 7 products
      const fetchLove = await Product.find({ brand : { $in : 'LOVE'}}).limit(7)

      if(!fetchLove){

        res.status(400)
        throw new Error('an error occurs')
      }

      res.status(200).json(fetchLove)


  }
)



// ------------------------------------------------------------------------------------------------- //
// --------------------------- GET PRODUCT FILTER BY COLLECTION (CATEGORIE) ------------------------ //
// ------------------------------------------------------------------------------------------------ //


export const getProductByCollection = asyncHandler(

  async(req, res)=>{



    try{


      // we search the specific collection in the database with ,req.params

      const { idCat } = req.params

      // we store this specific collection in a variable
      const collection = await Category.findById(idCat)
      

      // we search each product in the database with the specific collection
      // Like that in the front-end when I click in a  category I get Only the product of this category / collection

      const product = await Product.find({ category : collection._id})
  
      res.status(200).json(product)


    }catch(err){


      res.status(400)
      throw new Error(err)


    }

   
  }
)


// ------------------------------------------------------------------------------------- //
// ---------------------------- GET PRODUCT FILTER BY BRAND  -------------------------- //
// ----------------------------------------------------------------------------------- //


export const getProductByBrand = asyncHandler(


  async(req, res)=>{


    try{


      // We don't use the query method because here because I have not created a model for the brand
      // We filter the brand by the query method in the front-end
      // We create 6 differents routes pages in the front with a specific brand in the url exemle hostname:/Trinity
      

      // We desctructuring the path after the hostname from the url to the front-end 
      const { path } = req.query


      // we search each brand in the database

      const brandLove = await Product.find({ brand : 'LOVE'})
      const brandTrinity = await Product.find({ brand : 'TRINITY'})
      const brandPanthere = await Product.find({ brand : 'PANTHERE DE CARTIER'})
      const brandSantos = await Product.find({ brand : 'SANTOS'})
      const brandCdeCartier = await Product.find({ brand : 'C DE CARTIER'})

     

       // we create an switch statement to get the right brand
       // e.g if the client click on the page for 'hostname:/Trinity' we will get the product with the brand 'TRINITY',
       // the same for another brand thanks to the switch
  
      switch (true) {

        case path === '/LOVE':
          return res.json(brandLove)

        case path === '/TRINITY':
         return res.json(brandTrinity)
         
        case path === '/PANTHERE-DE-CARTIER':
          return res.json(brandPanthere)

          case path === '/SANTOS':
            return res.json(brandSantos)

            case path === '/C-DE-CARTIER':
              return res.json(brandCdeCartier)
          
      
        default:
          break;
      }

  
    
    }catch(err){


      res.status(400)
      throw new Error(err)
    }



  }
)

    

