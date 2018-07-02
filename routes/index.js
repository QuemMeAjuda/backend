const express = require('express');
var User = require('./user.route');
var router = express.Router(); // organizando as minhas rotas.
var Ajuda = require('./ajuda.route');
var init = require('./init.route');

router.use('/ajuda', Ajuda);
router.use('/user', User);
router.use('/admin', init);

module.exports = router; //deixando o router publico, para app.js ter acesso a ele