var mongoose = require('mongoose');

var alunoAjudaSchema =  new mongoose.Schema({

    id:{
        type: String,
        default: ''
    },

    ajudaID: {
        type: String,
        default: ''
    },

    alunoID:{
        type: String,
        default: ''
    }

});
var AlunoAjuda = mongoose.model('AlunoAjuda', alunoAjudaSchema);
module.exports = AlunoAjuda;

