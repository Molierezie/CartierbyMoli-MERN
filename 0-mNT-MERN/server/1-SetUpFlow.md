# <font color="#00b0f0">SetUp - FILE - STRUCTURE - NPM</font>

## <font color="#92cddc">Diagram Analogy</font>

## <font color="#e36c09">Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 index.js

```js

// Nothing

```

🧩 Package.json

```js
json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### <font color="#95b3d7">1 - Task</font>

- create the index.js file
- install dependencies and explain their role
- Create the structure Basic of the folder 
- Configuration package.json for run script

### <font color="#4f81bd">1 - Solution</font>


#### <font color="#b2a2c7">🧩 Structure Folder</font>

##### <font color="#ccc1d9">Understand structure🤔⬇️</font>

- 1️⃣ - `elementOfCode`

	- 
---

#### <font color="#b2a2c7">🧩 in Package.json</font>


```json
  "scripts": {
    "server": "nodemon server/index.js",
    "client": "npm run dev --prefix client",
    "dev" : "concurrently \"npm run client\" \"npm run server\" "
  },
```


---

#### <font color="#b2a2c7">🧩 in index.js</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js


// Package
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";

// Connection DB
import connectDB from "./config/db.js";

//utils
import dotenv from "dotenv";
4️⃣ import morgan from "morgan";


dotenv.config();
const port = process.env.PORT || 5500;

connectDB();

const app = express();

5️⃣ app.use(express.json())
6️⃣ app.use(express.urlencoded({extended : true}));
7️⃣ app.use(cookieParser())



app.use("/api/users", userRoute);


app.listen(port, ()=>console.log(`server is running on port ${port}`))


```

##### <font color="#ccc1d9">Understand Code & dependencies🤔⬇️</font>


- 4️⃣ - `morgan`
    
    - Ressource
    -  allows flexibility when logging HTTP requests and updates precise status and response time in custom format strings.
    For log HTTP requests and errors, and don't want to write extra configuration codes, Morgan is the best option.

--
- 5️⃣ - `app.use(express.json())`

    - Ressource
        - here
    - express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.

```js

import express from "express";
const app = express();

 app.use(express.json());

const port = process.env.PORT || 5500;

app.post("/login", (req, res)=>{

    // Without `express.json()`, `req.body` is undefined.
    console.log(req.body);
})


app.listen(port, ()=>console.log(`server is running on port ${port}`))
```

--

- 6️⃣ `app.use(express.urlencoded({ extend : true }))`

    - Ressource
        - Link [SVGIE on Youtube](https://www.youtube.com/watch?v=5dZNWL4sEGo)

    - Whenever we are sending for example an information from a form the data from the client to the server it will send in the form of URL encoded format through that request
    - But server can't understand that uRL encoded format by default
    - So we use this now it will create an object and it will send it to the server , so if the server want understand this format we should pass that URL encoded format right into a json format

    <font color="#9bbb59">example before</font>

```js
import express from "express";
const app = express();


connectDB();

dotenv.config();
const port = process.env.PORT || 5500;

app.get("/login", (req, res)=>{

    res.send("<form action='/login' method='POST'><input type='text' name='username'><input type='password' name='password'><input type='submit'></form>")
})

app.post("/login", (req, res)=>{

    res.send("Yes this is an user")
    console.log(req.body);
})


app.listen(port, ()=>console.log(`server is running on port ${port}`))

```

- In my browser when I enter username "Moli" , password "1234" the information and submit
- My browser display "Yes this is an user"
- In console/reséau/login/en-tête/ content-type : application/x-www-form-urlencoded


🧩`terminal` file
```terminal
undefined
```

--

- 1️⃣0️⃣ - `asyncHandler`


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

 <font color="#9bbb59">example after</font>

```js
import express from "express";
const app = express();

👀 app.use(express.urlencoded({extends : true})); 👀

connectDB();

dotenv.config();
const port = process.env.PORT || 5500;

app.get("/login", (req, res)=>{

    res.send("<form action='/login' method='POST'><input type='text' name='username'><input type='password' name='password'><input type='submit'></form>")
})

app.post("/login", (req, res)=>{

    res.send("Yes this is an user")
    console.log(req.body);
})


app.listen(port, ()=>console.log(`server is running on port ${port}`))

```

- In my browser when I enter username "Moli" , password "1234" the information and submit
- My browser display "Yes this is an user"

🧩`terminal` file
```terminal
{ username: 'MOLI', password: '1234' }
```

--

- 7️⃣ - `app.use(cookieParser())`
    
    - cookie-parser middleware is used to parse cookies in Node.js applications.


# <font color="#00b0f0">SetUp - DataBase & Models</font>

## <font color="#92cddc">Diagram Analogy</font>

## <font color="#e36c09">Practice</font>

### <font color="#95b3d7">1 - Code before</font>

🧩 `Config/db.js`

```js


```

🧩 `Models/userModel.js`

```js


```


### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution</font>

---
#### <font color="#b2a2c7">🧩 in .env</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

URL_MONGO = 'mongodb://127.0.0.1:27017/e-commerce-CartierbyMoli'

```
---
#### <font color="#b2a2c7">🧩-  in db.js</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import mongoose from 'mongo'
import dotenv from ''
dotenv.config()

const urlMongo = process.env.URL_MONGO

const connectDb = async ()=>{


    try{

        await mongoose.connect(urlMongo)
        console.log('Database is connect')

    }catch(error){

        1️⃣ console.error(`message: ${error.message}`);
        2️⃣ process.exit(1);

    }
}


export default connectDB
```

##### <font color="#ccc1d9">Understand code 🤔⬇️</font>

- 1️⃣ - `console.error`

    - log the error details to the console. This helps in debugging by providing information about why the connection failed.
--
- 2️⃣ - `process.exit(1)`

     - Immediate Termination: Ensures the application does not continue running in an unstable state when a critical error occurs, such as a failed database connection
     - Exit Code: The exit code 1 indicates that the process ended due to an error, which can be useful for debugging and monitoring purposes.
 

---


#### <font color="#b2a2c7">🧩 in userModel.js</font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import mongoose from "mongoose";    

const { Schema } = mongoose;

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

{timestamps : true}

);


const User = mongoose.model("Users", userSchema);

export default User

```

##### <font color="#ccc1d9">Understand code 🤔⬇️</font>

- 1️⃣ - `timestamps`

    - The utility of timestamps is to automatically generate createdAt and updatedAt 



## To range

#### <font color="#95b3d7">1 - Task</font>

- SetUp the project 
- Install package for back-end
- Install dependencies
- edit script in package.json
- create the folder by convention

#### <font color="#4f81bd">1 - Solution</font>

- 1️⃣ `Installation Tailwind + Vite (doc vite)`

🧩`terminal`
```terminal

```

- 2️⃣ `Install dependencies outside client and server folder`

🧩`terminal`
```terminal
npm init -y
```


- 3️⃣ `npm i for server`

🧩`terminal`
```terminal
npm i morgan nodemon multer mongoose jsonwebtoken express-formidable express-async-handler express dotenv cors cookie-parser concurrently bcryptjs
```

- morgan 
    - this is 

- mongoose
    - this is

- 4️⃣ `npm i for client`

🧩`terminal`
```terminal
npm i slick-carousel react-slick react-toastify react-router react-router-dom react-redux react-icons apexcharts react-apexcharts moment flowbite axios @reduxjs/toolkit @paypal/react-paypal-js
```

🧩`package.json` folder
- 4️⃣ `edit scripts for front-end and back-end in package.json`

replace this 

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
by

```json
  "scripts": {
    "server": "nodemon server/index.js",
    "client": "npm run dev --prefix client",
    "dev" : "concurrently \"npm run client\" \"npm run server\" "
  },
```
🧩`back-end || server` folder

```js

- server
    - utils
    - config
    - middlewares
    - models
    - controllers
    - routes
- index.js

```




##  <font color="#c00000">Handle Error || Fix bug</font>

### <font color="#d83931">.env & database structure</font>

#### <font color="#d99694">The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.</font>

##### Problem


`Before` :

structure of my file and folder

- client
- server
    - config
    - controller
    - router
    - model
    - utils
    - middlewares
- .env

I have no problem and my database is connected ?

db.js file

```js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async ()=>{

    try {

        await mongoose.connect(process.env.DATABASE_URL);
        console.log("database is connected");
        
    } catch (error) {
        
        console.error(`message: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB


```

`After` :

When I edit the structure of my file

- client
- server
    - config
    - controller
    - router
    - model
    - utils
    - middlewares
    - .env


 I have this error and message in the terminal "message: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string."

 Why ?

 Inside the server folder: When you place the .env file inside the server folder, the dotenv.config() call in your db.js file may not correctly locate the .env file because it expects it to be in the root directory of the project or the directory from where the script is being executed.

Outside the server folder: When the .env file is in the root directory (outside the server folder), it’s more likely to be correctly found because when you run your server script (e.g., node server/index.js), the script starts execution in the root directory. dotenv.config() will look in the current directory (root) and successfully find the .env file.

##### Solution

```js

import mongoose from "mongoose";
import dotenv from "dotenv";
👀 dotenv.config({ path: './server/.env' });

const connectDB = async ()=>{

    try {

        await mongoose.connect(process.env.DATABASE_URL);
        console.log("database is connected");
        
    } catch (error) {
        
        console.error(`message: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB
```





Back-end index.js

```js

// Package
import path from "path";
import express from "express";
// import cors from "cors";
// import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";

// Routes
import userRoute from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Connection DB
import connectDB from "./config/db.js";

//utils
// import dotenv from "dotenv";
import morgan from "morgan";
import { ENV_VARS } from "./config/envVar.js";


morgan("dev")


// dotenv.config();
// dotenv.config({ path: './server/.env' });
const port = ENV_VARS.PORT || 5500;



const app = express();

// app.use(cors({ origin: 'http://localhost:5500' }));

// app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())



app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/upload", uploadRoutes);


// app.get('api/config/paypal', (req, res)=>{

//     res.send({ clientId : process.env.PAYPAL_CLIENT_ID})
// })

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId:  ENV_VARS.PAYPAL_CLIENT_ID });
  });
  

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


if(ENV_VARS.NODE_ENV === "production"){

  app.use(express.static(path.join(__dirname, "/client/dist")))


  app.get("*", (req, res)=>res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")))
}


app.listen(port, ()=>{

  console.log(`server is running on port ${port}`)
  connectDB()
})
```

front-end vite config.js

```js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {

    proxy : {

      "/api" : "http://localhost:5500", 
      // "/api" : "https://cartierByMoli-api.onrender.com",
      "/upload" : "http://localhost:5500",
      // "/upload" : "https://cartierByMoli-api.onrender.com",
    },

    historyApiFallback: true
    
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  optimizeDeps: {
    include: ['@fvilers/disable-react-devtools'],
  },

  build: {
    outDir: 'dist', // Make sure this matches the directory in Render settings
  },



})

```


this is my structure of my project

- client
- server
    - config
    - controllers
    - routes
    - model
    - utils
    - middlewares
    - .env
- uploads


Hey I have deploy my application on render (front and back) but not the images how I can deploy the image in my folder 'uploads' ?