import app from './src/app.js'
import config from './src/utils/config.js'
import logger from './src/utils/logger.js'

const PORT = config.PORT
app.listen(PORT, () => logger.info('application is running on the port ', PORT))
