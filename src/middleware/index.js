import handler from './handler';
import notFound from './not-found-handler';
import errorLogger from './error-logger';
import requestLogger from './request-logger';
import packageVersion from './package-version';
import cidHandler from './cid-handler';

export default {
  errorLogger,
  requestLogger,
  notFound,
  handler,
  packageVersion,
  cidHandler
};
