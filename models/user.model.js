var Mongoose = require('mongoose');
var userSchema = new Mongoose.Schema({
    name: String,
    university: String
});

var User = Mongoose.model('user', userSchema);


