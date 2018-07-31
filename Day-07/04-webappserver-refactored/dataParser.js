const url = require('url');

module.exports = function(req){
	req['urlObj'] = url.parse(req.url);
	req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
}