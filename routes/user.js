const express = require('express');
const router = express.Router();

// User routes
const userController = require('../controllers/user');
router.route('/')
	.post(userController.create);
router.route('/all')
	.get(userController.list);
router.route('/:id')
	.get(userController.read)
	.put(userController.update)
	.delete(userController.delete);

module.exports = router;
