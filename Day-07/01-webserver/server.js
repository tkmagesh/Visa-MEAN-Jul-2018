const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

const server = http.createServer((req, res) => {
	let urlObj = url.parse(req.url),
		resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname,
		resourcePath = path.join(__dirname, resourceName);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resourcePath).pipe(res);
});
server.listen(8080);