import app from './app';
import { ENV } from './config/env';
import { connectDB } from './config/db';

async function startServer() {
  await connectDB();
  
  app.listen(ENV.PORT, () => {
    console.log(`Server listening on port ${ENV.PORT}`);
  });
}

startServer();
