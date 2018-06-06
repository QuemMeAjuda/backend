var mongoose = require('mongoose');

var ajudaSchema =  new mongoose.Schema({
    author:{
        type: String,
        default: ''
    },
    generalDescription:{
        type: String,
        default: '',
        required: true
    },

    detailedDescription: {
        type: String,
        default: '',
        required: true
    },

    tags:[{
       type:String,
    }],
    awnsers:[{
        default: []
    }],
    //Caso a ajuda esteja fechada.
    closed:{
        type: Boolean,
        default: false
    },

    coments:[{
        type: String,
        default:[]
    }]

});
var Ajuda = mongoose.model('ajuda', ajudaSchema);
module.exports = Ajuda;

