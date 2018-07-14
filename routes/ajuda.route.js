const express = require('express');
const router = express.Router();
const ajudaController = require('../controllers/ajuda.controller');


router.post('/postAjuda', ajudaController.postAjuda);
router.get('/getAjuda/:id' , ajudaController.getAjuda);
router.get('/getAjudas', ajudaController.getAjudas);
router.put('/updateAjuda', ajudaController.updateAjuda);
router.put('/closeAjuda/:id', ajudaController.closeAjuda);
router.delete('/deleteAjuda/:id', ajudaController.deleteAjuda);
router.get('/getAjudas/:num', ajudaController.getAjudasByTen);
router.get('/getHelpsByUser/:authorID', ajudaController.getHelpsByUser);

router.put('/putAnswer/:id', ajudaController.putAnswer);
router.delete('/deleteAnswer/:id', ajudaController.deleteAnswer);

module.exports = router;