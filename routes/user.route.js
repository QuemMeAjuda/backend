const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/getUser/:id', userController.getUser);
router.post('/postUser', userController.postUser);
router.get('/getAjudasByAluno/:id', userController.getAjudaByAluno);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);

module.exports = router;