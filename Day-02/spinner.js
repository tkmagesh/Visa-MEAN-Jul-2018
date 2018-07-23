create an object and assign it to a variable 'spinner'

var spinner = ....

spinner.up() // => 1
spinner.up() // => 2
spinner.up() // => 3
spinner.up() // => 4

spinner.down() // => 3
spinner.down() // => 2
spinner.down() // => 1
spinner.down() // => 0
spinner.down() // => -1

counter = 10000
spinner.counter = 10000

function spinnerFactory(){
	var counter = 0;

	function up(){
		return ++counter;
	}

	function down(){
		return --counter;
	}
	var result = {
		up : up,
		down : down
	}

	return result;
}
var spinner = spinnerFactory();

var spinner = (function (){
	var counter = 0;

	function up(){
		return ++counter;
	}

	function down(){
		return --counter;
	}
	var result = {
		up : up,
		down : down
	}

	return result;
})();



