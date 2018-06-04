var Mongoose = require('mongoose');
var userSchema = new Mongoose.Schema({
    name:{
        type:String,
        default: ''
    },
    university:{
        type:String,
        default:''
    },
    uid:{
        type: String,
        default: ''
    },
    isTutor:{
        type: Boolean,
        default: false
    },
    tutorias:[{
        type:String,
        default:''
    }],
    avaliacao: {
        type: Number,
        default: ''
    },
    graduation:{
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }
});

var User = Mongoose.model('User', userSchema);
module.exports = User;


