const express = require('express');
const router = express.Router();

const friendController = require('./friend-controller');

router.route('/')
	.post(friendController.create);
router.route('/all')
	.get(friendController.list);
router.route('/:id')
	.get(friendController.read)
	.put(friendController.update)
	.delete(friendController.remove);

module.exports = router;
