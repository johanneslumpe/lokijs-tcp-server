export default query => collection => {
  if (!collection) {
    throw new Error(`Collection does not exist`);
  }
  return collection.find(query);
};
