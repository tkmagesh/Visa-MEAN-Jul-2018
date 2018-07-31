const fs = require('fs'),
	path = require('path');

let staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res, next){
	let	resourceName = req.urlObj.pathname;
	if (isStatic(resourceName)){
		let resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath).pipe(res);
		stream.on('end', next);
		
		/*let stream = fs.createReadStream(resourcePath);
		stream.on('data', function(chunk){
			console.log('[@serveStatic] serving one chunk of data to response');
			res.write(chunk);
		});
		stream.on('end', function(){
			res.end();
			next();
		});*/
	} else {
		next();
	}
}