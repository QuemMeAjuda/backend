//Author: Wesley Gonçalves Anibal
var User = require('../models/user.model');
const Ajuda = require('../models/ajuda.model');
const AlunoAjuda = require('../models/AlunoAJuda');
const mongoose = require('mongoose');


exports.postUser = async function (req, res) {
    //req é o que recebe
    //res é a resposta que daremos
    let user = new User(req.body);//criando um novo user;
    user.save((err, us)=>{//salvando no BD
        if(err){//caso dê erro
            return res.status(400).json({message:"Falha na operacao", status:400});//retornando uma msg de erro
        }else{//caso dê certo
            return res.status(201).json({message:"Aluno adicionado com sucesso", status:201, data: {name: us.name}});//retornado o objeto com alguns atributos só
        }
    })
};


exports.getUser = function (req, res) {
    User.findById(req.params.id, (err, user)=>{//pesquisando o user no BD
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" user não encontrado", status: 404});
            }else{
                    res.status(200).json({message:"User encontrado",status:201,data:user});
            }
        }

    })
};

exports.getAjudaByAluno = async function(req, res){

    const aluId = mongoose.Types.ObjectId(req.params.id);
    let result = [];
    try {
        const user = await User.findOne({_id: aluId});
        if (!user) {
            return res.status(400).json({message: "Usuário não encontrado", status: 404});
        } else {
            AlunoAjuda.find({alunoID: user._id}).then(function (ajudaAluno) {
                let ajudas = ajudaAluno.map(ajudaAluno => ajudaAluno.ajudaID);
                let promises = [];
                ajudas.forEach(function (ajuda) {
                    promises.push(Ajuda.find({_id: ajuda}, (err, aju)=>{
                        result = result.concat(aju);
                    }))
                });
                Promise.all(promises).then(resolve => { res.status(200).json({message:"Ajudas encontradas com sucesso", data: result, status: 200})});
            });
        }
    } catch (e) {
        return res.status(400).json({message:e, status: 400});
    }
};

exports.getAllUsers = function (req, res) {
    User.find({}, (err, users)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            res.status(200).json({message:"users encontrados com sucesso",status:200,data:users});
        }
    })
};
