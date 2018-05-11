var mongoose = require('mongoose');

var alunoAjudaSchema =  new mongoose.Schema({

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

