const fs = require('fs'),
	path = require('path'),
	util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

let dataFile = path.join(__dirname, '../data/taskDB.json');
let fileContents = fs.readFileSync(dataFile, { encoding : 'utf8'});

var list = JSON.parse(fileContents);



function writeToFile(list){
	

	let data = JSON.stringify(list);
	//fs.writeFile(dataFile, data, callback);
	//return writeFileAsync(dataFile, data);
	return new Promise(function(resolve, reject){
		fs.writeFile(dataFile, data, () => resolve());
	});
}
function getAll(){
	
	return Promise.resolve([...list]);
}

function get(id){
	return Promise.resolve(list.find(task => task.id === parseInt(id)));
}

function addNew(taskData, callback){
	var newTaskId = list.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
	var newTask = { ...taskData, id : newTaskId};
	list.push(newTask);
	return writeToFile(list)
		.then(() => newTask)
	//return newTask;
}

function update(taskIdToUpdate, updatedTask, callback){
	var taskToUpdate = list.find(task => task.id === taskIdToUpdate);
	if (taskToUpdate){
		list = list.map(task => task.id === taskToUpdate.id ? updatedTask : task);
		//return updatedTask;
		return writeToFile(list)
			.then(() => updatedTask);
	} else {
		return Promise.resolve(null);
	}
}


function partialUpdate(taskIdToUpdate, dataToUpdate, callback){
	var taskToUpdate = list.find(task => task.id === taskIdToUpdate),
		updatedTask = {...taskToUpdate, ...dataToUpdate};
	if (taskToUpdate){
		list = list.map(task => task.id === taskToUpdate.id ? updatedTask : task);
		//return updatedTask;
		return writeToFile(list)
			.then(() => updatedTask);
	} else {
		return Promise.resolve(null);
	}
}

function remove(id, callback){
	list = list.filter(task => task.id !== id);
	return writeFile(list)
		.then(() => ({}));
}

module.exports = { addNew, getAll, get, update, partialUpdate, remove};

