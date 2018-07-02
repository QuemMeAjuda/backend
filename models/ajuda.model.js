var mongoose = require('mongoose');

var ajudaSchema =  new mongoose.Schema({
    author:{
        type: Object,
        default: {}
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
    answers:{
        type: Array,
        default: []
    },
    authorID: {
        type: String,
        default: ''
    },
    //Caso a ajuda esteja fechada.
    closed:{
        type: Boolean,
        default: false
    },

    comments:[{
        type: String,
        default:[]
    }]

});
var Ajuda = mongoose.model('ajuda', ajudaSchema);
module.exports = Ajuda;

