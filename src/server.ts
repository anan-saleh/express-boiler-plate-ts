import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app : Application = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello from TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
