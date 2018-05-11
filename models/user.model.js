var Mongoose = require('mongoose');
var userSchema = new Mongoose.Schema({
    name:{
        type:String,
        default: ''
    },
    university:{
        type:String,
        default:''
    }
});

var User = Mongoose.model('User', userSchema);
module.exports = User;


