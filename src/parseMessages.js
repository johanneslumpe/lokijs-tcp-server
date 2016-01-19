export default msg => msg.split('\n').filter(msg => !!msg).map(JSON.parse);
