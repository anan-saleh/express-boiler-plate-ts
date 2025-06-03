import express, { Application } from 'express';
import { ENV } from './utils/env';


const app : Application = express();
const PORT = ENV.PORT;

app.get('/', (req, res) => {
  res.send('Hello from TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
