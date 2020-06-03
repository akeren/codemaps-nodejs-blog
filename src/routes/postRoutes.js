const express = require('express')

const postController = require('./../controllers/postController')
const auth = require('./../middleware/auth')

const router = express.Router()

router.route('/new').get(auth, postController.createPost)
router
  .route('/store')
  .post(postController.checkPostBody, auth, postController.storePost)
router.route('/:id').get(postController.getPost)

module.exports = router
