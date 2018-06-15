const express = require('express');
const router = express.Router();
const ajudaController = require('../controllers/ajuda.controller');


router.post('/postAjuda', ajudaController.postAjuda);
router.get('/getAjuda/:id' , ajudaController.getAjuda);
router.get('/getAjudas', ajudaController.getAjudas);
router.put('/updateAjuda', ajudaController.updateAjuda);
router.put('/closeAjuda', ajudaController.closeAjuda);
router.delete('/deleteAjuda', ajudaController.deleteAjuda);
router.get('/getAjudas/:num', ajudaController.getAjudasByTen);


router.put('/putCommentAjuda', ajudaController.putCommentAjuda);
router.delete('/deleteCommentAjuda', ajudaController.deleteCommentAjuda);

module.exports = router;