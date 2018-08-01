const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client){

	const db = client.db('learning');

	const products = db.collection('products');

	products.find({}).toArray(function(err, productDocs){
		for(let doc of productDocs)
			console.log(JSON.stringify(doc));

		client.close();
	});
});

