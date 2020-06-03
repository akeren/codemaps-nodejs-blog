const express = require('express')

const userController = require('./../controllers/userController')
const auth = require('./../middleware/auth')
const redirectToHomeIfAuth = require('./../middleware/redirectAuthenticated')

const router = express.Router()

router.route('/logout').get(auth, userController.logout)

router.use(redirectToHomeIfAuth)

router.route('/register').get(userController.createUser)
router.route('/login').get(userController.getLogin)
router.route('/register').post(userController.storeUser)
router.route('/login').post(userController.processLogin)

module.exports = router
