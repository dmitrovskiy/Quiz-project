import expressWinston from 'express-winston';
import logger from '../helpers/logger';

export default () => {
  return expressWinston.logger({
    transports: [logger],
    colorize: true,
    dynamicMeta: req => ({ correlationId: req.correlationId })
  });
};
