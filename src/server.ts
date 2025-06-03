import { app } from './app';
import { ENV } from './utils/env';
import { log } from './utils/logger';
import { connectDB } from './config/db';

const PORT = ENV.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    log(`Server running at http://localhost:${PORT}`);
  });
});

