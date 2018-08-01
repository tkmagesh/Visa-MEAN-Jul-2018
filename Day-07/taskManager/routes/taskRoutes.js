var express = require('express');
var router = express.Router();
const taskService = require('../services/taskService');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(taskService.getAll());
});

router.get('/:id', function(req, res, next){
	let taskToReturn = taskService.get(parseInt(req.params.id));
	if (taskToReturn){
		res.json(taskToReturn);
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	var newTask = taskService.addNew(newTaskData);
	res.status(201).json(newTask);
})

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTask = req.body;
	let result = taskService.update(taskIdToUpdate, updatedTask);
	if (result){
		res.status(200).json(result);
	} else {
		res.status(404).end(); 
	}
});

router.patch('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		dataToUpdate = req.body;
	let result = taskService.partialUpdate(taskIdToUpdate, dataToUpdate);
	if (result){
		res.status(200).json(result);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', function(req, res, next){
	taskService.remove(parseInt(req.params.id));
	res.json({});
});



module.exports = router;
