const fs = require('fs'),
	path = require('path');

let staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		let	resourceName = req.urlObj.pathname;
		let resourcePath = path.join(staticResourcePath, resourceName);
		if (isStatic(resourcePath) && fs.existsSync(resourcePath)){
			var stream = fs.createReadStream(resourcePath).pipe(res);
			stream.on('end', next);
		} else {
			next();
		}
	}
}