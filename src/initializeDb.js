import Promise from 'bluebird';
import debug from 'debug';

const log = debug('loki::tcp::initialize');

import createLokiInstance from './createLokiInstance';
import maybeLoadExistingDB from './maybeLoadExistingDB';

export default options => {
  const { filename } = options;
  return Promise.resolve({ filename })
    .then(createLokiInstance)
    .tap(() => log('Loki instance created'))
    .then(maybeLoadExistingDB);
    // .then(maybeSetupRequiredCollections)
};
