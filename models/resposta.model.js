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
}

var User = Mongoose.model('User', userSchema);
module.exports = User;


