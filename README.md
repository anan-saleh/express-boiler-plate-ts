<!--

----------------------first commit ----------------------------------------------------
    These are the commands i followed to make this project run typescript

    npm init -y
    npm install express
    npm install -D typescript ts-node @types/node @types/express
    
    npx tsc --init
    
    {
        "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "dist",
        "rootDir": "src",
        "strict": true,
        "esModuleInterop": true
        }
    } 

    "scripts": {
      "start": "ts-node src/index.ts",
      "build": "tsc",
      "serve": "node dist/index.js"
    }

my question are this

1) how will the build work later, how can i place it in docker how can i make it work on deployment


 ---------------------------- second commit ----------------------------------

npm install -D nodemon
add nodemon.json file with these settings

{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["dist"],
  "exec": "ts-node src/server.ts"
}


changes for scripts
-----------------before-------------------

    "scripts": {
      "start": "ts-node src/index.ts",
      "build": "tsc",
      "serve": "node dist/index.js"
    }

--------------after--------------------------
 "scripts": {
    "start:dev": "nodemon", // change this script to nodemon only
    "build": "tsc",
    "serve": "node dist/index.js"
  },



--------------------------------- third commit -----------------------------------------

npm install dotenv

Add on nodemon.json on watch .env

--------------------------------- fourth commit -----------------------------------------

 npm install pino
 npm install pino-pretty --save-dev

add util folder with logger.ts

understand later the metadata if its a mistake or not


--------------------------------- fifth commit -----------------------------------------

 make a util file for env where i check if env variable exist or not

 import the env config on the util file --- check later if it was a mistake


--------------------------------- seventh commit -----------------------------------------

npm install -D eslint @stylistic/eslint-plugin

I used mjs on config so i can use module import and export since the project is for required syntax

-->



<---
        possible issues

    1) app.routing issue/ route not found 404 => restarting IDE can keep the port running

->



