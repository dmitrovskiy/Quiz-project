import expressWinston from 'express-winston';
import logger from '../helpers/logger';

export default () => {
  return expressWinston.errorLogger({
    transports: [logger],
    colorize: true,
    dynamicMeta: req => ({ correlationId: req.correlationId })
  });
};
