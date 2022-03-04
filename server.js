import app from './app.js';
import config from './utils/config.js';
import logger from './utils/logger.js';

const PORT = config.PORT
app.listen(PORT, () => logger.info('application is running on the port ', PORT));
