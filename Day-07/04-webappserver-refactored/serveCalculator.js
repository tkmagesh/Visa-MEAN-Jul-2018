const querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator'){
		let calcData = req.method === 'GET' ? req.queryData : req.bodyData;
		let n1 = parseInt(calcData.n1),
			n2 = parseInt(calcData.n2),
			op = calcData.op;

		let result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
		next();
	}  else {
		next();
	}
}