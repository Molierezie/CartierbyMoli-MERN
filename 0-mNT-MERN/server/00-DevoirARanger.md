

hey I try to connect my back-end on the website render.com

I have this error

==> Running 'npm run server'
> project-cartierbymoli@1.0.0 server
> nodemon server/index.js
[nodemon] 3.1.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server/index.js index.js`
server is running on port 10000
==> Your service is live 🎉
message: connect ECONNREFUSED 127.0.0.1:27017
[nodemon] app crashed - waiting for file changes before starting...

my database is stored in .env
DATABASE_URL = mongodb://127.0.0.1:27017/e-commerce-CartierbyMoli

When I run my code in vscode I don't have this error
How I can solve ?


Je n'ai pas de compte mongoDB Atlas en fait depuis j'ai installé mongoDB Compass sur mon ordinateur comme je travail localement donc pour je dois créer un compte mongoDB atlas et ensuite comment je dois faire pour transférer toute mes données de mongodb Compass à mongoDB Atlas ?