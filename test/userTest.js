const assert = require('chai').assert;
const userCont = require('../controllers/user.controller');
/*const userMod = require('../models/user.model');*/
const userRoutes = require('../routes/user.route');

describe('UserTest', function () {


    var sucess = {message:"Aluno adicionado com sucesso", status:201, data: {name: 'Luan'}};

    var user = {name: 'Luan', university: 'ufcg'};


    it('PostUser', done => {

        posts
            .postUser(user)
                .end(err, res => {
                expect(res.body.equal(sucess));

                done(err);
        });
    });
})