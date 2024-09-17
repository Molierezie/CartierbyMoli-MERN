
## Change I made :

- add npm i @ and add in the main.jsx with if(process.env.NODE_ENV)
- npm run dev become npm run build
- in package.json : // "version": "0.0.0",
- in index.js app.use(cors({ origin: 'http://localhost:5500' })); // Before Deployment become app.use(cors(corsOptions))
- .env / package.json and package-lock-json weren't in the server file I them added
- .env I remove the ' ' at the beginning and the end

my personal access token : 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

## Problem ran



`Git is not working after macOS update "xcrun: error: invalid active developer path /Library/Developer/CommandLineTools"`

link : https://www.youtube.com/watch?v=SbKWEhyBvO0

`Git push: Missing or invalid credentials. fatal: Authentication failed for 'https://github.com/username/repo.git'`

link : https://stackoverflow.com/questions/62860280/git-push-missing-or-invalid-credentials-fatal-authentication-failed-for-http

`Git, fatal: The remote end hung up unexpectedly`

link : https://stackoverflow.com/questions/15240815/git-fatal-the-remote-end-hung-up-unexpectedly

`On log render ""Publish directory build does not exist!"`

- in render.com edit :  Publish Directory should be set to dist (or the directory where your build files are output).
- in ViteConfig.js : add build: {
    outDir: 'dist', // Make sure this matches the directory in Render settings
  },
- Build Command should be npm run build.

`Error “Invalid scheme, expected connection string to start with “mongodb://” or “mongodb+srv://””`

link : https://www.mongodb.com/community/forums/t/error-invalid-scheme-expected-connection-string-to-start-with-mongodb-or-mongodb-srv/204312

- remove ";" at the end and the semi-colons


### Later

const { search} = useLocation();
const sp = new URLSearchParams(search);
const redirect = sp.get("redirect") || "/register"



const [ register , {isLoading}] = useRegisterMutation()

useEffect(() => {
  userInfo && navigate(redirect)
}, [navigate, redirect, userInfo])



this is my structure folder


Project
-client
  - dist
    - assets
      -image1
  - src
    - components
      -home.jsx
-node_modules
_server
.env
.gitgnore
package-lock-.json
package.json

If I'm in the home page what's the path for access to the image1 ?


## Git & GitHub

### When I try to push

Error :
RPC failed; HTTP 400 curl 22 The requested URL returned error: 400 Bad Request

Problem :
Solved it for me - this was due to pushing a few large images 

response

    - 📖 [Stack Over Flow](https://stackoverflow.com/questions/62753648/rpc-failed-http-400-curl-22-the-requested-url-returned-error-400-bad-request)