const express = require('express');
var User = require('./user.route');
var router = express.Router(); // organizando as minhas rotas.
var Ajuda = require('./ajuda.route');

router.use('/ajuda', Ajuda);
router.use('/user',User);

module.exports = router; //deixando o router publico, para app.js ter acesso a ele