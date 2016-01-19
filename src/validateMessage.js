import * as operations from './constants/';

const operationsByCode = Object.keys(operations).reduce((carry, key) => {
  carry[operations[key]] = key;
  return carry;
}, {});


export default msg => {
  const { col, op, obj } = msg;

  if (!operationsByCode[op]) {
     throw new Error('Invalid operation');
  }

  if (!col) {
    throw new Error('No collection specified');
  }

  return msg;
};
