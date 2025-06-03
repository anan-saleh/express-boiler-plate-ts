import express from 'express';
import { ENV } from './utils/env';
import { log } from './utils/logger';

const app  = express();
const PORT = ENV.PORT;

app.listen(PORT, () => {
  log(`Server running at http://localhost:${PORT}`);
});
