var express = require('express');
var router = express.Router();


var list = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Master JavaScript', isCompleted : true}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(list);
});

router.get('/:id', function(req, res, next){
	let taskToReturn = list.find(task => task.id === parseInt(req.params.id));
	if (taskToReturn){
		res.json(taskToReturn);
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	var newTaskId = list.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
	var newTask = { ...newTaskData, id : newTaskId};
	list.push(newTask);
	res.status(201).json(newTask);
})

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		taskToUpdate = list.find(task => task.id === taskIdToUpdate),
		updatedTask = req.body;
	if (taskToUpdate){
		list = list.map(task => task.id === taskToUpdate.id ? updatedTask : task);
		res.status(200).json(updatedTask);
	} else {
		res.status(404).end();
	}
});

router.patch('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		taskToUpdate = list.find(task => task.id === taskIdToUpdate),
		updatedTask = { ...taskToUpdate, ...req.body };
	if (taskToUpdate){
		list = list.map(task => task.id === taskToUpdate.id ? updatedTask : task);
		res.status(200).json(updatedTask);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	list = list.filter(task => task.id !== taskIdToDelete);
	res.json({});
});



module.exports = router;
