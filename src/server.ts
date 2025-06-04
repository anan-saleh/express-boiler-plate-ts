import { app } from './app';
import { ENV } from './utils/env';
import { log } from './utils/logger';
import { connectDB } from './config/db';

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const PORT = ENV.PORT;
const startServer = () => {
  connectDB().then(() => {
    app.listen(PORT, () => {
      log(`Server running at http://localhost:${PORT}`);
    });
  });
};

startServer();

