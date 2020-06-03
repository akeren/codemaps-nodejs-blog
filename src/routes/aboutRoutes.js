const express = require('express');
const aboutController = require('./../controllers/aboutController');

const router = express.Router();

router.route('/about').get(aboutController);
module.exports = router;
