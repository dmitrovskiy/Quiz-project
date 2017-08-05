import packageInfo from '../helpers/package-info';

export default () => (req, res, next) => {
  if (res.headersSent) next();

  res.set('x-api-version', packageInfo.version);
  next();
};
