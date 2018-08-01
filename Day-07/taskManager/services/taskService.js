const fs = require('fs'),
	path = require('path');

let dataFile = path.join(__dirname, '../data/taskDB.json');
let fileContents = fs.readFileSync(dataFile, { encoding : 'utf8'});

var list = JSON.parse(fileContents);

function writeToFile(callback){
	let data = JSON.stringify(list);
	fs.writeFile(dataFile, data, callback);
}
function getAll(){
	return [...list];
}

function get(id){
	return list.find(task => task.id === parseInt(id));
}

function addNew(taskData){
	var newTaskId = list.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
	var newTask = { ...taskData, id : newTaskId};
	list.push(newTask);
	return newTask;
}

function update(taskIdToUpdate, updatedTask){
	var taskToUpdate = list.find(task => task.id === taskIdToUpdate);
	if (taskToUpdate){
		list = list.map(task => task.id === taskToUpdate.id ? updatedTask : task);
		return updatedTask;
	} else {
		return null;
	}
}


function partialUpdate(taskIdToUpdate, dataToUpdate){
	var taskToUpdate = list.find(task => task.id === taskIdToUpdate),
		updatedTask = {...taskToUpdate, ...dataToUpdate};
	if (taskToUpdate){
		list = list.map(task => task.id === taskToUpdate.id ? updatedTask : task);
		return updatedTask;
	} else {
		return null;
	}
}

function remove(id){
	list = list.filter(task => task.id !== id);
}

module.exports = { addNew, getAll, get, update, partialUpdate, remove};

