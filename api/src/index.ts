// Main application entry point, starts the Express server.
import 'dotenv/config'; // Load environment variables first
import "tsconfig-paths/register.js"; // Enables path aliases 
import { createApp } from '@/createApp';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const app = createApp();
const port = config.port;

app.listen(port, () => {
  logger.info(`Server rnaaaaaaaaannt ${port} in ${config.nodeEnv} mode`);
});
