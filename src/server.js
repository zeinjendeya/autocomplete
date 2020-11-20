const http = require('http');
const router = require('./router');

const server = http.createServer(router);

server.listen(4000, () => {
    console.log('sever working on port http://localhost:4000');
})