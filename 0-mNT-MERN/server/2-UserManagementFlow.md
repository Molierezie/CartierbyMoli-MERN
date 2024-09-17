# <font color="#00b0f0">1️⃣ - USER MANAGEMENT</font> 

## Brouillon listening

📸

## <font color="#4bacc6">🧠 - Theory ?</font>

### <font color="#92cddc">🔎 - What’s theme ?</font>

📝 - `explanation`
- 📔 `Ressource`
    - 📖 [Official Documentation](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)
    - 🎥 [Video YTB - Code with Nader - 11min / 13min](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)
--
- blablabla

---
## <font color="#4bacc6">🤔 - Use Case ?</font>

### <font color="#92d050">☑️ - Pros</font>

📝 - `explanation`
- 📔 `Ressource`
    - [Video YTB - Ytber - 40min - 1h ](url)

- Blabla

### <font color="#c00000">🔻 - Cons </font>

📝 - `explanation`
- 📔 `Ressource`
    - [Video YTB - Ytber - 40min - 1h ](url)

- Blabla

### <font color="#548dd4">👍🏾 - Alternative </font>

📝 - `explanation`
- 📔 `Ressource`
    - [Video YTB - Ytber - 40min - 1h ](url)

- Blabla

---
## <font color="#e36c09">💻 - Practice Understand Concept</font>

### <font color="#f79646">⌨️ - Basic Practice & Remark & To avoid</font>

---
#### <font color="#ffc000">❗️ - Remark & Interview Question</font>

`1 )`

- Question blablabla ?

```js

// code
1️⃣

```

`good answers` ✅

- 1️⃣ - `extract`
    - This means the blabla

---

`2 )`

- Question Blabla ?
    

```js

// code
1️⃣

```

`good answers` ✅


- 1️⃣ - `extract`
    - This means the blabla

---
#### <font color="#95b3d7">👨🏾‍💻 - Let's Practice</font>
---
`Task & Code before ⏳`
---


```jsx

// 1) ----------------------------------- practice 1 -----------------------------------

// code before

// 1. First do this
// 2. Then do this


// 2) -  --------------------------------- practice 1 ----------------------------------

// code before

// 1. First do this
// 2. Then do this


```

---
`Solution ✅`
---

`1 )` ----------------------------------- practice 1 -----------------------------------

```jsx

```

- 1️⃣ - `extract`
    - blabla

- 2️⃣ - `extract`
    - blabla

---

`2)` ----------------------------------- practice 2 -----------------------------------

```jsx

```
    
- 1️⃣ - `extract`
    - blabla

- 2️⃣ - `extract`
    - blabla


---
### <font color="#d99694">💻 - Practical Real Project</font>

#### <font color="#95b3d7">👨🏾‍💻 - Way 1</font>

`Task & Code before ⏳`
---


```jsx

// 1) ----------------------------------- practice 1 -----------------------------------

// code before

// 1. Create an authentication with JWT HttpOnly Cookie for Admin and User

```

---
`Solution ✅`
---

`1.` ----------------------------  🧩 in userRouter  ---------------------------------

```jsx

```

- 1️⃣ - `extract`
    - blabla

- 2️⃣ - `extract`
    - blabla


`2.` ----------------------------  🧩 in userController  ---------------------------------

```jsx

```

- 1️⃣ - `extract`
    - blabla

- 2️⃣ - `extract`
    - blabla

---

#### <font color="#95b3d7">👨🏾‍💻 - Way 2</font>

`Task & Code before ⏳`
---


```jsx

// 1) ----------------------------------- practice 1 -----------------------------------

// code before

// 1. Create an authentication with JWT HttpOnly Cookie for Admin and User

```

---
`Solution ✅`
---

`1.` ----------------------------  🧩 in userRouter  ---------------------------------

```jsx

```

- 1️⃣ - `extract`
    - blabla

- 2️⃣ - `extract`
    - blabla


`2.` ----------------------------  🧩 in userController  ---------------------------------

```jsx

```

- 1️⃣ - `extract`
    - blabla

- 2️⃣ - `extract`
    - blabla

---
## 🖌️ <font color="#b2a2c7">Diagram Understand Concept</font>

### <font color="#e5e0ec">Diagram 1</font>
### <font color="#e5e0ec">Diagram 2</font>


---

## <font color="#c00000">Handle Error || Fix bug</font>

### <font color="#d83931">Theme Bug e.g</font>

#### <font color="#d99694">Fix bug</font>

```js


```



# <font color="#00b0f0">1️⃣ - REGISTER</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩`userController` 

```js

// nothing

```

🧩`userRoutes` 

```js

// nothing

```

🧩`index.js` 

```js


// Package
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


// Connection DB
import connectDB from "./config/db.js";

//utils
import dotenv from "dotenv";
import morgan from "morgan";


dotenv.config();
const port = process.env.PORT || 5500;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())




app.listen(port, ()=>console.log(`server is running on port ${port}`))

```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅</font>


#### <font color="#b2a2c7">🧩 in userController.js</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import User from "../models/userModels.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"


export const createUser = 
1️⃣ asyncHandler(
    async(req, res)=>{


        const { username, email, password } = req.body

        if(!username || !email || !password){

                res.status(400)
                throw new Error('Please fill all fields')

        },

        const emailExist = await User.findOne({email})
        const usernameExist = await User.findOne({username})

        if(emailExist){

            res.status(400)
            throw new Error('Email Already exist')

        }

         if(usernameExist){

            res.status(400)
            throw new Error('Username Already exist')

        }


        const hashPassword = await bcrypt.hashSync(password, 15)

        const newUser = new User({

            username : username,
            email : email,
            password : hashPassword
        })

        await newUser.save()
        generateToken(res, newUser._id)

        2️⃣ const displayFront = await User.findById(newUser._id).select('username')

        res.status(200).json(dispalyFront)


    }
)

```


##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `asyncHandler & Throw new Error`


- asyncHandler is likely a middleware that wraps your route handler to catch any errors thrown inside it
- It relies on the asyncHandler to catch any errors thrown within the function.
- Instead of using return statements with res.status().json(), it sets the status code separately and then throws an error.
- The asyncHandler is expected to catch these errors and send appropriate responses.
- It still performs all the necessary checks and operations as the previous version.
- It adds a check to ensure the user was actually created before sending a success response.


- This approach can make the code more linear and easier to follow in some cases, as it doesn't have the nested structure of a try-catch block. However, it does require that the asyncHandler is properly set up to handle errors and send appropriate responses.

`difference vs res.status(400).json({ error.message : "ppapa"})`

- With throw new Error(), you're relying on the asyncHandler to send the response.
- With res.status().json(), you're sending the response directly.
- The throw approach can be more consistent if you're using asyncHandler throughout your application.

--
- 2️⃣ - `select`

- Select method is used to select which fields are to be returned in the query result, excluding select means we want all the other fields to be returned, here is simple usage as per the docs.


```js

// THE FIRST WAY TO DO

// include only username & email exclude other fields  

await User.findOne({ email}).select(' username email')

// exclude passwords include other fields  
await User.findOne({ email}).select('-password')

// THE SECOND WAY TO DO

await User.findOne({ email}, 'username email')

await User.findOne({ email}, '-password')


```

#### <font color="#b2a2c7">🧩 - in userRoutes.js</font>

##### <font color="#a5a5a5">💻 - Code</font>


```js

import express from ''
import { createUser } from "../controllers/userController.js"

const router = express.Router()

router.get('create-users', createUser)

```


#### <font color="#b2a2c7">🧩 - in Index.js</font>

##### <font color="#a5a5a5">💻 - Code</font>


```js


// Package
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
👀 import userRoute from "./routes/userRoutes.js";

// Connection DB
import connectDB from "./config/db.js";

//utils
import dotenv from "dotenv";
import morgan from "morgan";


dotenv.config();
const port = process.env.PORT || 5500;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

👀 app.use("/api/users", userRoute);

app.listen(port, ()=>console.log(`server is running on port ${port}`))
```


# <font color="#00b0f0">2️⃣ - LOGIN</font>



## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩`userController` 

```js

// nothing

```

🧩`userRoutes` 

```js

// nothing

```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅</font>

#### <font color="#b2a2c7">🧩 -  in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js



export const userLogin = asyncHandler(

    async (req, res)=>{

        const { email , password} = req.body

        const user = await User.findOne({email})

        if(!user){

            res.status(400)
            throw new Error('email incorrect')
        }
       
       const comparePassword = await bcrypt.hashSync(password, user.password)

       if(!comparePassword){
            res.status(400)
            throw new Error('password incorrect')
       }

        generateToken(res, user._id)

        const responseFront = await User.findById(user._id, 'username')

       res.status(200).json(responseFront)
    }
)

```

# <font color="#00b0f0">3️⃣ - LOGOUT</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

🧩`userController` 

```js

// nothing

```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

export const Logout = asyncHandler(

    async(req, res)=>{

        res.clearCookie('jwt')
        res.status(200).json('successfully logout')
    }
)
```


##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `res.clearCookie('jwt')`

	- 



# <font color="#00b0f0">4️⃣ - GET-All-USER</font>

## <font color="#92cddc">Diagram Analogy</font>

## <font color="#e36c09">Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 in userController 

```js


```

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

export const getAllUser = 
asyncHandler(
    async(req, res)=>{

        const user = await User.find({}, '-password')

        if(!user){
            res.status(400)
            throw new Error('aucun utilisateur trouvé')
        }

        res.status(200).json(user)
    }
)

```


# <font color="#00b0f0">5️⃣ - UPDATE-PROFILE</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

🧩 in userController 

```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js


export const updateProfile = asyncHandler(

    async(req, res)=>{


        const { username, email, password } = req.body

        1️⃣ const auth = req.user

        const user = await User.findById(auth._id)

        if(!user){
            
            res.status(400)
            throw new Error('User not connect or authorize')
        }

        user.username = username || user.username
        user.email = email || user.email

        if (password){

            const hashPassword = await bcrypt.hashSync(password, 15)

            user.password = hashPassword || user.password
        }

        await user.save()

        const responseFront = await User.findById(user._id, '-password')

        res.status(200).json(responseFront)

    }
)

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `const auth = req.user`

	- When the user is connect I can retrieves this information thanks to req.user creates in the authentication, so we simply verify if we have a user well connect

# <font color="#00b0f0">6️⃣ - GET-ONE-USER</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

🧩 in userController 

```js


```

🧩 in userRoutes

```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

export const getOneUser = asyncHandler(

    async( req, res )=>{

        const { id } = req.params

        const user = await User.findById(id, 'username')

        if(!user){

            res.status(400)
            throw new Error('User not found')
        }

        res.status(200).json(user)
    }
)

```

#### <font color="#b2a2c7">🧩-  in userRoute.js </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import express from ''
import { getOneUser } from ''
import { authenctication, adminOnly } from ''

const router = express.Router()

router.get('/get-user', authenctication, adminOnly , getOneUser)


export default router

```


# <font color="#00b0f0">7️⃣ - DELETE-USER</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

🧩 in userController 

```js


```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩-  in userController </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js


export const deleteUser = asyncHandler(

    async(req, res)=>{

        const { id } = req.params

        const user = await User.findById(id)

        if(!user){

            res.status(400)
            throw new Error('User not find')
        }

        await User.deleteOne(user._id)

        res.status(200).json(user)
    }
)

```


