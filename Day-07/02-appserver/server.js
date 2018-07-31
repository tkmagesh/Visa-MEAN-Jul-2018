const http = require('http'),
	  url = require('url'),
	  querystring = require('querystring'),
	  calculator = require('./calculator');

let server = http.createServer((req, res) => {
	let urlObj = url.parse(req.url),
		queryData = querystring.parse(urlObj.query);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	let n1 = parseInt(queryData.n1),
		n2 = parseInt(queryData.n2),
		op = queryData.op;

	let result = calculator[op](n1, n2);
	res.write(result.toString());
	res.end();
});

server.listen(8080);