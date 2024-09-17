# <font color="#00b0f0">1️⃣ -  CREATE TOKEN</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

- 🧩 in createToken.js

```js

```

### <font color="#95b3d7">1 - Task</font>

- a
- b
- c 

### <font color="#4f81bd">1 - Solution ✅ </font>

#### <font color="#b2a2c7">🧩 in createToken.js </font>

##### <font color="#a5a5a5">💻 - Code</font>

```js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = async(res, userId) => {

    const secret = process.env.JWT_SECRET

    1️⃣ const genToken = jwt.sign( { userId }, token , { expiresIn : '30d' })


    const options = {

        httpOnly : true,
        secure: process.env.NODE_ENV !== "development", 
        sameSite : "strict",
        maxAge : 30*24*60*60*1000
    }

    2️⃣ res.cookie('jwt', genToken, options)

    }

export default generateToken
```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `genToken`

- This creates a new JWT token with the userId in the payload, signs it with the secret key, and sets it to expire in 30 days.

--

- 2️⃣ - `res.cookie`
- res.cookie take 3 parameters
     - "jwt" the name which appears in the browers for the cookie
     - the gentToken create
     - the most important parts the object cookie

--
- 3️⃣ - `options`

- the object cookie take 3 important properties

    - <span style="background:#ffff00">httpOnly</span> 
        - This option ensures that the cookie is only accessible via HTTP(S) requests and not accessible through JavaScript running in the browser.
        -  It helps mitigate the risk of client-side script attacks, such as Cross-Site Scripting (XSS), by preventing access to the cookie via document.cookie.

    - <span style="background:#ffff00">secure</span>
        - The secure flag indicates that the cookie should only be sent over HTTPS, ensuring that the cookie is transmitted securely.
        - This helps prevent the cookie from being intercepted during transmission over insecure (HTTP) connections

    - <span style="background:#ffff00">sameSite</span>
        - Purpose: The sameSite attribute controls whether the cookie is sent with cross-site requests.
        - The cookie will only be sent in a first-party context and not be sent along with requests initiated by third-party websites.
        - This helps protect against Cross-Site Request Forgery (CSRF) attacks by ensuring the cookie is only sent with requests originating from the same site.
    - <span style="background:#ffff00">maxAge</span>
       - This allows the cookie to persist for 30 days before it expires and is removed from the client.
        

# <font color="#00b0f0">1️⃣ - AUTHENTICATION & AUTHORIZATION</font>

## <font color="#92cddc">📝 - Diagram Analogy</font>

## <font color="#e36c09">👨🏾‍💻 - Practice</font>

## <font color="#95b3d7">1 - Code before</font>

🧩 in middleware

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

import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();


export const authentication = asyncHanler(

    async (req, res, next )=>{


        const secret = process.env.JWT_SECRET

       1️⃣ const token = res.Cookies.jwt

        if(!token){

            res.status(400)
            throw new Error('Not cookie')
        }

        2️⃣ const decoded = jwt.verify( token, secret )
        
        console.log(decoded)

        if(!decoded){

            res.status(400)
            throw new Error('Token & Secret not match')
            
        }

        3️⃣ const req.user = await User.findById( decoced.userId, 'username email')

        console.log(req.user.username, req.user.email)

        if(!req.user){

            res.status(400)
            throw new Error('Not authenticate')

        }

        next()
    }
)


export const adminOnly = asyncHandler(

        async(req, res, next)=>{

            if(!req.user || !req.user._id){
            res.status(400)
            throw new Error('Not authenticate')
            }

            if(!req.user.isAdmin){
            res.status(400)
            throw new Error('Not authorization')
            }

            next()
        }
)

```

##### <font color="#ccc1d9">Understand Code 🤔⬇️</font>

- 1️⃣ - `res.Cookies.jwt`

    - in the front cookie is on Cookies
    - the name of the cookie is 'jwt'
    - So we excrated the cookie from the request

--
- 2️⃣ - `decoded`

    - The token is verified using the secret key. This step decodes the token and extracts the payload (in this case, userId)

--
- 3️⃣ - `const req.user = await User.findById( decoced.userId, 'username email')`
    
    - req.user is a convention in Express applications to store information about the authenticated user.
    - The user is fetched from the database using the userId extracted from the decoded token.
    - Once set, req.user is available in all subsequent middleware and route handlers for that request
    - It allows you to access user information without having to query the database again


