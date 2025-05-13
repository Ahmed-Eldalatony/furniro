// Main application entry point, starts the Express server.
<<<<<<< HEAD
import 'dotenv/config';
import "tsconfig-paths/register.js";
// import { createApp } from '@/createApp';
// import { config } from '@/config';
/
// import { logger } from '@/utils/logger';
//
//
import { createApp } from '@/createApp';
=======
import 'dotenv/config'; // Load environment variables first
import "tsconfig-paths/register.js"; // Enables path aliases 
import { createApp } from '@/../createApp';
import { config } from '@/config';
import { logger } from '@/utils/logger';

>>>>>>> 3334e03 (ref:seperate api related files)
const app = createApp();
const port = config.port;

app.listen(port, () => {
  logger.info(`Server rnaaaaaaaaannt ${port} in ${config.nodeEnv} mode`);
});


export default app;
