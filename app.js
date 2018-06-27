
/*jshint esversion: 6 */

const http = require('http');

const server = http.createServer((req,res) => {
	if(req.url === '/'){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.write('Hello World!');
		res.end();
	}
});

server.listen(3000);

console.log("Listening on port 3000");