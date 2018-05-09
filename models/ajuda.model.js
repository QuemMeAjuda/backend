var mongoose = require('mongoose');

var ajudaSchema =  new mongoose.Schema({

    generalDescription:{
        type: String,
        default: ''
    },

    detailedDescription: {
        type: String,
        default: ''
    },

    tags:[{
       type:String,
    }],

    //Caso a ajuda esteja fechada.
    closed:{
        type: Boolean,
        default: false
    }

});
var Ajuda = mongoose.model('ajuda', ajudaSchema);
module.exports = Ajuda;

