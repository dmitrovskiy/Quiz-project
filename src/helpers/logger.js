import winston from 'winston';

const logger = new winston.Logger({
  colorize: true
});

if (process.env.NODE_LOG === 'on') {
  logger.add(
    winston.transports.Console,
    {
      prettyPrint: true,
      timestamp: true
    }
  );

  logger.cli();
}

export default logger;
