const express = require('express');
const router = express.Router();

const groupController = require('./group-controller');

router.route('/')
	.post(groupController.create);
router.route('/all')
	.get(groupController.list);
router.route('/:id')
	.get(groupController.read)
	.put(groupController.update)
	.delete(groupController.remove);

module.exports = router;
