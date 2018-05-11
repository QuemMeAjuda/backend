//Author: Wesley Gonçalves Anibal
var Ajuda = require('../models/ajuda.model');
var AlunoAjuda = require('../models/AlunoAJuda');
var User = require('../models/user.model');

exports.postAjuda = async function (req, res) {
    let ajuda = new Ajuda(req.body.ajuda);
    let user = User.findById(req.body.alunoID,(err, us)=>{
        if(err){
            return res.status(400).json({message:"Usuário não existe", status:400});
        }else{
            ajuda.save((err, us)=>{
                if(err){//caso dê erro
                    return res.status(400).json({message:"Falha na operacao", status:400});//retornando uma msg de erro
                }else{//caso dê certo
                    return res.status(201).json({message:"Ajuda cadastrada com sucesso", status:201, data: ajuda});
                }
            })

            let alunoAjuda = new AlunoAjuda({alunoID: req.body.alunoID, ajudaID: ajuda._id});
            alunoAjuda.save((err, us)=>{});
        }
    });
};

exports.getAjuda = async function(req,res) {
    Ajuda.findById(req.params.id,(err,us)=>{
        if(err){
            return res.status(400).json({message:"Ajuda não encontrada", status:400});
        }else{
            return res.status(200).json({message:"Ajuda encontrada com sucesso", status:200, data: us});
        }
    })
};

exports.getAjudas = async function (req, res) {
    Ajuda.find({}, (err, ajudas)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            return res.status(200).json({message:"Ajudas encontradas com sucesso", status:200, data: ajudas})
        }
    })
}


