const http = require('http'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	serveNotFound = require('./serveNotFound');

const server = http.createServer((req, res) => {
	dataParser(req);
	serveStatic(req, res);
	serveCalculator(req, res);
	serveNotFound(res);
});
server.listen(8080);