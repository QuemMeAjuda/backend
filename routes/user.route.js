const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/getUser', userController.getUser);
router.post('/postUser', userController.postUser);

module.exports = router;