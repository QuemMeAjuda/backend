const express = require('express');
const userController = require('/controllers/user.controller')();
const router = express.Router();

router.get('/getUser', userController.getUser);
router.post('/', userController.postUser);
router.delete('/', userController.deleteUser);

module.exports = router;