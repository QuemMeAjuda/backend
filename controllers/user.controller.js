//Author: Wesley Gonçalves Anibal
var User = require('../models/user.model');
const Ajuda = require('../models/ajuda.model');
const AlunoAjuda = require('../models/AlunoAJuda');
const mongoose = require('mongoose');


exports.postUser = async function (req, res) {
    let user = new User(req.body);
    console.log(user);
    user.save((err, us)=>{
        if(err){
            return res.status(400).json({message:"Falha na operacao", status:400});
        }else{
            return res.status(201).json({message:"Aluno adicionado com sucesso", status:201, data: {name: us.name}});   
        }
    })
};


exports.getUser = function (req, res) {
    console.log("getUser");
    User.findById(req.params.id, (err, user)=>{//pesquisando o user no BD
        if(err){
            return res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                return res.status(404).json({message:" user não encontrado", status: 404});
            }else{
                return res.status(200).json({message:"User encontrado",status:201,data:user});
            }
        }

    })
};

exports.getUserByUid = function(req, res){
    User.find({uid:req.params.uid}, (err, user)=>{
        if(err){
            return res.status(400).json({message: "Falha na operação", status:400});
        }else{
            if(user == null){
                return res.status(404).json({message:"Usuário não encontrado", status:404});
            }else{
                return res.status(200).json({message:"Usuário encontrado", status: 201, data: user});
            }
        }
    })
}
exports.getAjudaByAluno = async function(req, res){
    let result = [];
    try {

        const user = await User.findOne({uid: req.params.id});
        if (!user) {
            return res.status(400).json({message: "Usuário não encontrado", status: 404});
        } else {
            console.log('getajudas');
            console.log(user);
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
        console.log(e);
        return res.status(400).json({message:e, status: 400});
    }
};

exports.getAllUsers = function (req, res) {
    User.find({}, (err, users)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            res.status(200).json({message:"Usuários encontrados com sucesso",status:200,data:users});
        }
    })
};

exports.updateUser = function (req, res) {
    let userID = req.body.userID;
    User.findById(userID, (err, user)=>{
        if(err) {
            return res.status(400).json({message:"Usuário não encontrado", status: 404});
        } else {
            let novoUser = User(req.body.user);
            user.name = novoUser.name;
            user.university = novoUser.university;
            user.save();
            return res.status(200).json({message:"Usuário modificado com sucesso", status:200, data: {name: user.name}});
        }
    });
};

exports.deleteUser = function (req, res) {
  let userID = req.body.userID;
  User.findByIdAndRemove(userID, (err, user)=>{
      if(err){
          res.status(400).json({message:"Usuário não encontrado", status:404});
      }else{
          res.status(200).json({message:"Usuário deletado com sucesso", status:200});
      }
  }).exec();

};

//////////////////////////////// CRUD DE TUTOR //////////////////////////////////////////////////////////////

exports.postTutor = async function (req, res) {
    User.findById(req.params.id, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                user.isTutor = true;
                user.save();
                res.status(200).json({message:"User é tutor",status:201,data:user});
            }
        }
    })
};

exports.getTutor = function (req, res) {
    User.findById(req.params.id, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                if(user.isTutor){
                    res.status(200).json({message:"User é tutor",status:201,data:user});
                }else{
                    res.status(404).json({message:" User não é tutor", status: 404});
                }
            }
        }
    })
};

exports.updateAvaliacaoTutor = function (req, res) {
    let userID = req.body.userID;
    let avaliacao = req.body.avaliacao;
    User.findById(userID, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                user.avaliacoesTutor.push(avaliacao);

                let sum = 0;
                for (let i = 0; i < user.avaliacoesTutor.length; i++){
                    sum += user.avaliacoesTutor[i];
                }
                let media = sum / user.avaliacoesTutor.length;
                user.notaTutor = media;

                user.save();
                res.status(200).json({message:"Avaliacao add, nota atualizada", data:user});
            }
        }
    })
};

exports.getNotaTutor = function (req, res) {
    let userID = req.params.id;
    User.findById(userID, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                res.status(200).json({message:"Nota do Tutor", data:user.notaTutor});
            }
        }
    })
};


exports.updateAvaliacaoUser = function (req, res) {
    let userID = req.body.userID;
    let avaliacao = req.body.avaliacao;
    User.findById(userID, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                user.avaliacoesUser.push(avaliacao);

                let sum = 0;
                for (let i = 0; i < user.avaliacoesUser.length; i++){
                    sum += user.avaliacoesUser[i];
                }
                let media = sum / user.avaliacoesUser.length;
                user.notaUser = media;

                user.save();
                res.status(200).json({message:"Avaliacao add, nota atualizada", data:user});
            }
        }
    })
};

exports.getNotaUser = function (req, res) {
    let userID = req.params.id;
    User.findById(userID, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                res.status(200).json({message:"Nota do User", data:user.notaUser});
            }
        }
    })
};

exports.deleteTutor = function (req, res) {
    User.findById(req.params.id, (err, user)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            if(user == null ){
                res.status(404).json({message:" User não encontrado", status: 404});
            }else{
                user.isTutor = false;
                user.save();
                res.status(200).json({message:"User não é tutor",status:201,data:user});
            }
        }
    })
};
