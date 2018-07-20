function add(){
	function parseArg(n){
		if (Array.isArray(n)) return add.apply(this, n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n);
	}
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments, 1));
}

/*
As a method of an obj
	this -> obj
As a function
	this -> global (window)

using the 'call' method of the function

using the 'apply' method of the function
*/