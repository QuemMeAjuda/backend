const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/getUser/:id', userController.getUser);
router.post('/postUser', userController.postUser);
router.get('/getAll', userController.getAllUsers);
router.get('/getAjudasByAluno/:id', userController.getAjudaByAluno);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);
router.get('/getUserByUid/:uid', userController.getUserByUid);

router.get('/getTutor/:id' , userController.getTutor);
router.post('/postTutor/:id', userController.postTutor);
router.put('/updateAvaliacaoTutor', userController.updateAvaliacaoTutor);
router.delete('/deleteTutor/:id', userController.deleteTutor);

router.get('/getTopTutors',userController.getTopTutors);

module.exports = router;