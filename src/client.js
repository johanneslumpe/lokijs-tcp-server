import net from 'net';

import * as operations from './constants/';
import prepareMessage from './prepareMessage';
import parseMessages from './parseMessages';

const query = {
	op: operations.QUERY,
	col: 'children',
	obj: {
		query: {
			name: 'test'
		},
		sort: 'legs',
		limit: 10,
		offset: 5
	}
};

const client = new net.Socket();
client.connect(1337, '127.0.0.1', () => {
	console.log('query sent');
	client.write(prepareMessage(query));
});

let tmp = '';
client.on('data', data => {
	const str = data.toString();
	tmp = tmp + str;
	if (str.endsWith('\n')) {
		const result = parseMessages(tmp);
		console.log(result[0]);
		console.log(result[0].length);
		tmp = '';
	}
});

client.on('close', () => {
	console.log('Connection closed');
});
