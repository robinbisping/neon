const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
	res.send('API!')
})

// User routes
const user_controller = require('../controllers/userController')
router.route('/user')
	.post(user_controller.create)
router.route('/user/:id')
	.get(user_controller.get)
	.delete(user_controller.delete)
router.route('/users')
	.get(user_controller.list)

// Friend routes
const friend_controller = require('../controllers/friendController')

// Group routes
const group_controller = require('../controllers/groupController')

module.exports = router
