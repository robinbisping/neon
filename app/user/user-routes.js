const express = require('express');
const router = express.Router();

const userController = require('./user-controller');

router.route('/')
	.post(userController.create);
router.route('/all')
	.get(userController.list);
router.route('/:id')
	.get(userController.read)
	.put(userController.update)
	.delete(userController.remove);

module.exports = router;
