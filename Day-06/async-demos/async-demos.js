var app = (function(){
	
	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning result`);
			if (typeof callback === 'function')
				callback(result);
		},3000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);
		});
	}

	var addAsyncEvents = (function(){
		var _listeners = [];

		function subscribe(listenerFn){
			_listeners.push(listenerFn);
		}

		function trigger(result){
			_listeners.forEach(listenerFn => listenerFn(result));
		}

		function doAdd(x,y){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				trigger(result);
			},3000);
		}
		return { subscribe, doAdd };
	})();
	

	return { 
		addAsyncClient, 
		addSyncClient, 
		addAsyncEvents 
	};
})();