export default () => {
  return (req, res, next) => {
    if (req.correlationId) req.correlationId = req.correlationId();
    next();
  };
};
