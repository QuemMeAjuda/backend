const express = require('express');

var router = express.Router(); // organizando as minhas rotas.

router.get('/', function (req, res) {
    res.json("Get de index.js");
})

router.post('/', function (req, res) {
    res.json("Post de index.js")
})

router.use('/user', require('../models/user.model')) //levando a outra rota /user

module.exports = router; //deixando o router publico, para app.js ter acesso a ele