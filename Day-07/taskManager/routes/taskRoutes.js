var express = require('express');
var router = express.Router();
const taskService = require('../services/taskService');



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.json(taskService.getAll());
  /*taskService.getAll((tasks) => {
  	res.json(tasks);
  });*/

  taskService
  	.getAll()
  	.then(tasks => res.json(tasks));
});

router.get('/:id', function(req, res, next){
	taskService.get(parseInt(req.params.id))
		.then(result => {
			if (result){
				res.json(result);
			} else {
				res.status(404).end();
			}
		})
});

router.post('/', function(req, res, next){
	var newTaskData = req.body;
	taskService.addNew(newTaskData) 
		.then(newTask => res.status(201).json(newTask));
	
})

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		updatedTask = req.body;
	taskService.update(taskIdToUpdate, updatedTask)
	.then(result => {
			if (result){
				res.status(200).json(result);
			} else {
				res.status(404).end();
			}
		});
	

});

router.patch('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id),
		dataToUpdate = req.body;
	taskService.partialUpdate(taskIdToUpdate, dataToUpdate)
		.then(result => {
			if (result){
				res.status(200).json(result);
			} else {
				res.status(404).end();
			}
		})
	
});

router.delete('/:id', function(req, res, next){
	taskService.remove(parseInt(req.params.id))
		.then(() => res.json({}));
	
});



module.exports = router;
