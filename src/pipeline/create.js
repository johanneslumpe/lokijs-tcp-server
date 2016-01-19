import debug from 'debug';

import findQuery from './findQuery';
import sorting from './sorting';
import returnData from './returnData';
import limitAndOffset from './limitAndOffset';

const log = debug('loki::tcp::pipeline::create');

export default (db, msg)=> {
  const { col, obj: { query, sort, limit, offset } } = msg;
  log('Creating pipeline');

  return Promise.resolve(db.getCollection(col).chain())
    .then(findQuery(query))
    .then(sorting(sort))
    .then(limitAndOffset({ limit, offset }))
    .then(returnData);
}
