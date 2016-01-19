export default limitOffsetConfig => resultSet => (
  ['offset', 'limit'].reduce((resultSet, key) => {
    const val = limitOffsetConfig[key];
    return val ?
      resultSet[key](val) :
      resultSet;
  }, resultSet)
);
