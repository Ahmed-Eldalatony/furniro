// Main application entry point, starts the Express server.
import 'dotenv/config';
import "tsconfig-paths/register.js";
// import { createApp } from '@/createApp';
// import { config } from '@/config';
/
// import { logger } from '@/utils/logger';
//
//
import { createApp } from '@/createApp';
const app = createApp();
const port = config.port;

app.listen(port, () => {
  logger.info(`Server rnaaaaaaaaannt ${port} in ${config.nodeEnv} mode`);
});


export default app;
