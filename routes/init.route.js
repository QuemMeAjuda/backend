const express = require('express');
const router = express.Router();
const initController = require('../controllers/init.controller');

router.post('/reset', initController.mockSystem);

module.exports = router;