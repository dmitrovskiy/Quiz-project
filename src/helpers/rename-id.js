export default (doc, ret) => {
  delete ret._id;
  return ret;
};
