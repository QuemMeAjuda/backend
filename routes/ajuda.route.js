const express = require('express');
const router = express.Router();
const ajudaController = require('../controllers/ajuda.controller');


router.post('/postAjuda', ajudaController.postAjuda);
router.get('/getAjuda/:id' , ajudaController.getAjuda);
router.get('/getAjudas', ajudaController.getAjudas);
router.put('/updateAjuda', ajudaController.updateAjuda);
router.delete('/deleteAjuda', ajudaController.deleteAjuda);


router.put('/putComentAjuda', ajudaController.putComentAjuda);

module.exports = router;