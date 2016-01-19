export default sortOptions => resultSet => {
  if (!sortOptions) {
    return resultSet;
  }

  if (typeof sortOptions === 'string') {
    return resultSet.simplesort(sortOptions);
  }

  if (Array.isArray(sortOptions)) {
    return resultSet.compoundsort(...sortOptions);
  }
};
