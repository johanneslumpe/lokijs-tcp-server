import net from 'net';
import Promise from 'bluebird';
import debug from 'debug';

import initializeDb from './initializeDb';
import prepareMessage from './prepareMessage';
import parseMessages from './parseMessages';
import validateMessage from './validateMessage';
import createPipeline from './pipeline/create';

const log = debug('loki::tcp')

const handleConnection = db => socket => {
  socket.on('data', data => {
    // TODO process multi-chunk messages?
    const messages = parseMessages(data.toString());

    messages.forEach(msg => {
      log('Processing message', msg);
      Promise.try(() => validateMessage(msg))
        .then(msg => createPipeline(db, msg))
        .then(result => socket.write(prepareMessage(result)))
        .catch(err => socket.write(prepareMessage(err.message)));
    });
  });
};

const createTcpServer = ({ onConnection }) => {
  const server = net.createServer(onConnection);
  console.log('Server created');
  return server;
};

initializeDb({ filename: 'test.db'})
.then(loki => {
  const children = loki.addCollection('children');

  children.insert({ name:'Sleipnir', legs: 8 });
  children.insert({ name:'Jormungandr', legs: 0 });

  let i = 0;
  while(i < 100) {
    children.insert({
      name:`test`,
      legs: i
    });
    i++;
  }

  return createTcpServer({
    onConnection: handleConnection(loki)
  });
}).then(server => {
  server.listen(1337, '127.0.0.1');
  'Server created';
});
