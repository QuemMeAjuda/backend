const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/getUser', userController.getUser);
router.post('/postUser', userController.postUser);
router.get('/getAjudasByAluno/:id', userController.getAjudaByAluno);

module.exports = router;