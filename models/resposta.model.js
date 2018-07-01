var Mongoose = require('mongoose');
var respostaSchema = new Mongoose.Schema({
    author: {
        type: String,
        default: ''
    },
    awnser: {
        type: String,
        default: ''
    }
});

var Resposta = Mongoose.model('Resposta', respostaSchema);
module.exports = Resposta;


