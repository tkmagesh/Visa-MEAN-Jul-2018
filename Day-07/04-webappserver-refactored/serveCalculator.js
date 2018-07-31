const querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	if (req.urlObj.pathname === '/calculator' && req.method === "GET"){
		let calcData = querystring.parse(req.urlObj.query);
		let n1 = parseInt(calcData.n1),
			n2 = parseInt(calcData.n2),
			op = calcData.op;

			let result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
	} else if (req.urlObj.pathname === '/calculator' && req.method === "POST"){
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
	}
}