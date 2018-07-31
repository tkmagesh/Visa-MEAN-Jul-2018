const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator')

let staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

const server = http.createServer((req, res) => {
	let urlObj = url.parse(req.url),
		resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
	if (isStatic(resourceName)){
		let resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === "GET"){
		let calcData = querystring.parse(urlObj.query);
		let n1 = parseInt(calcData.n1),
			n2 = parseInt(calcData.n2),
			op = calcData.op;

			let result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === "POST"){
		let rawData = '';
		req.on('data', (chunk)=> rawData += chunk);
		req.on('end', () => {
			let calcData = querystring.parse(rawData);
			let n1 = parseInt(calcData.n1),
				n2 = parseInt(calcData.n2),
				op = calcData.op;
			let result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});
server.listen(8080);