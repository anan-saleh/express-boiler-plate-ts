<!--
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

-->



