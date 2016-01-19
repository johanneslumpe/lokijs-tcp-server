import Promise from 'bluebird';
import { exists } from 'fs';

const existsAsync = Promise.promisify(exists);

export default ({ loki, filename }) => (
  existsAsync(filename).then(exists => (
    exists ?
      Promise.fromCallback(cb => {
        loki.loadDatabase(filename);
      }).return(loki) :
      loki
  ))
)
