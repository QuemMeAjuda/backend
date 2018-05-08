let User = require('/models/user.model');

const userController = function () {

    const postUser = function(req, res){
        new User(req.body);
    };

    const getUser = function (req, res) {
        res.json("Get de user.js");
    };

    const deleteUser =  function (req, res) {
        res.json("delete de user.js")
    };

    /**
     * estou usando ES6, para me ajudar a ocultar a informação e economizar memória,
     * sem precisar criar as mesmas funções várias vezes, somente uma vez e ela sendo usada pelos
     * objetos criados. ob1.__proto__ === ob2.__proto__ vai ser igual a true, economizando memória.
     */
    const saida = function () {
        saida.__proto__ = proto;
        return saida;
    };

    var proto = {postUser, getUser, deleteUser};

    return {saida};
};

module.exports = userController().saida;// importo o objeto, ao estilo python.