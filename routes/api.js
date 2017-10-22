const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	res.send('API!');
});

// User routes
const userController = require('../controllers/userController');
router.route('/user')
	.post(userController.create);
router.route('/user/:id')
	.get(userController.read)
	.put(userController.update)
	.delete(userController.delete);
router.route('/users')
	.get(userController.list);

// Friend routes
const friendController = require('../controllers/friendController');

// Group routes
const groupController = require('../controllers/groupController');

module.exports = router;
