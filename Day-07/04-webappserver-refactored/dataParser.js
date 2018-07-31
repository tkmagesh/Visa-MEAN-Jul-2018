const url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req['urlObj'] = url.parse(req.url);
	req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
	req['queryData'] = querystring.parse(req.urlObj.query);

	let rawData = '';
	req.on('data', (chunk)=> rawData += chunk);
	req.on('end', () => {
		req['bodyData'] = querystring.parse(rawData);
		next();
	});
}