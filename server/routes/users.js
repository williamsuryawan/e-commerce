const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

// router.get('/', UserController.findAll)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/login/admin', UserController.loginAdmin)

module.exports = router;