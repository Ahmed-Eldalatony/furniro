// Main application entry point, starts the Express server.
import 'dotenv/config'; // Load environment variables first
import { createApp } from '@/createApp';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const app = createApp();
const port = config.port;

app.listen(port, () => {
  logger.info(`Server running on port ${port} in ${config.nodeEnv} mode`);
});
