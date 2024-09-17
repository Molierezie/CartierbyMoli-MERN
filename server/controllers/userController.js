import User from "../models/userModels.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import generateToken from "../utils/createToken.js"
import bcryptjs from "bcryptjs"
import Product from "../models/productModels.js"


//---------------------------------------------------------
// -------------- REGISTER - LOGIN - LOGOUT ---------------
//---------------------------------------------------------

export const createUser = 
asyncHandler(

    async (req, res) =>{
    
        
        // We extract the data in the front with req.body 
        const { username, email, password } = req.body


        // We verify if the user enter in the input his email and password
        if(!username || !email || !password){

            res.status(400)
            throw new Error("Please completed all fiels")
            
        }

        const usernameExist = await User.findOne({username})
        const emailExist = await User.findOne({email})

        // We check if the email already exist in the database or not
        if(usernameExist){
            res.status(400)
            throw new Error("Username already exists") 
        }
        if(emailExist){
            res.status(400)
            throw new Error("Email already exists") 
        }



            // If the email doesn't exist we hash the password with bcrypt method
            const hashPassword = await bcrypt.hashSync(password, 15)
            
           
        // as we using destructuring we don't need to write to this way
        //  const newUser = new User({
        //  username (in db) :  username,
        // })
        // we use the method from mongoose for create a new document

            const userCreate = new User({

                username,
                email,
                password : hashPassword
            })

            // we register the new user in the database with the method .save()
            await userCreate.save()

            // We add the new user in the token

            generateToken(res, userCreate._id)

            // const responseFront = await User.findById(userCreate._id, 'em)

            res.status(200).json(userCreate)

    
        })
        


            
export const loginUser = 
asyncHandler(
                async(req, res)=>{
            

                      // we retrieves the data from the front-end using destructuring
                    const { email , password } = req.body

                    // we check if the user enter well his email and password
                    const existingUser = await User.findOne({ email });

                    if(!existingUser){
                        // return res.json({error : "Aucun utilisateur trouvé"})
                        res.status(400)
                        throw new Error("Aucun utilisateur")
                      
                        
                       }


                       // we compare the password with method from bcrypt and 
                    const comaparePassword = await bcrypt.compare(
                      password,
                      existingUser.password
                    );


                    if (!comaparePassword) {
                        return res.status(400).json({ error: "Mot de passe incorrect" });
                    }

                    // same logic createUser
                    generateToken(res, existingUser._id)

                    const responseFront = await User.findById(existingUser._id, 'username isAdmin')

                    res.status(200).json(responseFront)

                
                    
                    }
            )

          



            export const logoutCurrentlyUser = asyncHandler(

                async(req, res)=>{
            
            
                    try{
                    
                    let cookie = req.cookies.jwt
                    
                    // we check if there are a cookie store in the header
                    if(cookie){
            
                        // method for delete the cookie in the localStorage
                        res.clearCookie()
                        res.status(200).json('Deconnexion')
            
                    }else{
            
                        res.status(400)
                        throw new Error()
                    }
            
                    }catch(error){
            
                        res.status(400)
                        throw new Error('')
                    }
                }
            )
            
            

            
         

//---------------------------------------------------------
// ---------------------- USER TASK -----------------------
//---------------------------------------------------------

export const updateProfile =
asyncHandler(
    async(req, res)=>{


        // For update we don't use req.params we use req.user because the user is already connected
        // and we can use it directly
        const auth = req.user

        const { username, email, password } = req.body

        // We check if the user exist in the database
        const user = await User.findById(auth._id)

        if(!user){

            res.status(400)
            throw new Error('Aucun utilisateur trouvé')
        }


        // either the user update his email, usernmae or we keep the old information
            user.username = username || user.username
            user.email = email || user.email


        // if the user update his password we hash it
            if(password){

                const hashPassword = await bcrypt.hashSync(password, 15)

                user.password = hashPassword || user.password
            }
    
            
        await user.save()
        

        res.status(200).json(user)

    }
)





//---------------------------------------------------------
// --------------------- ADMIN TASK -----------------------
//---------------------------------------------------------


export const getAllUser = 
asyncHandler(
    async(req, res)=>{

        // we use select method for teh password because we don't need it
        const user = await User.find({}, '-password')

        if(!user){
            res.status(400)
            throw new Error('aucun utilisateur trouvé')
        }

        res.status(200).json(user)
    }
)



export const deleteUser =
asyncHandler(

    async(req, res)=>{


        // we want deleted a specific user so we use req.params
        const { id } = req.params
        const user = await User.findById(id);

        if(!user){

            res.status(404);
            throw new Error("User not found");
        }
            
            // If we are find the user we can delete it
            await User.deleteOne({_id : user._id})
            res.status(200).json({message : `User ${user.username} is deleted`}); 
    }
)

export const getOneUser =
asyncHandler(

    async(req, res )=>{


        const { id } = req.params

        const user = await User.findById(id).select("email username")

        if(!user){

            res.status(404)
            throw new Error("User not found")
        }

        res.status(200).json(user)
    }
)



export const AdminEditUser =
asyncHandler(

    async(req, res )=>{


        // same logic update but here we don't use req.user because I'm the Admin and I want update 
        // a specific user in the database
        const { id } = req.params
        const { email , username , isAdmin } = req.body
    
        const user = await User.findById(id)

        if(!user){

            res.status(404)
            throw new Error("User not found")
        }

        user.username = username || user.username;
        user.email = email || user.email

        // we converts to boolean because when we receive the value from the frontend it's sometimes a string
        user.isAdmin = Boolean(isAdmin) 

        await user.save()

        const responseFront = await User.findById(user._id).select("username")

        res.status(200).json(responseFront)
        
    }
)


