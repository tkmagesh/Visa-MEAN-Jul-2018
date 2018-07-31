const http = require('http'),
	path = require('path'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	serveNotFound = require('./serveNotFound'),
	app = require('./app');

app.use(dataParser);
app.use(serveStatic(path.join(__dirname, '/public')));
app.use(serveCalculator);
app.use(serveNotFound);

http.createServer(app).listen(8080);