
var userSchema = new Mongoose.Schema({
    id: String,
    name: String,
    university: String
});

var User = Mongoose.model('user', userSchema);


