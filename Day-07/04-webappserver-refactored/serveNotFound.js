module.exports = function(res){
	console.log('[@serveNotFound] serving 404');
	res.statusCode = 404;
	res.end();
}