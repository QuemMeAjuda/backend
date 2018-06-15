//Author: Wesley Gonçalves Anibal
var Ajuda = require('../models/ajuda.model');
var AlunoAjuda = require('../models/AlunoAJuda');
var User = require('../models/user.model');

exports.postAjuda = async function (req, res) {
    let ajuda = new Ajuda(req.body.ajuda);
    let user = User.findOne({uid: req.body.alunoID},(err, us)=>{
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
            console.log(us);
            let alunoAjuda = new AlunoAjuda({alunoID: us._id, ajudaID: ajuda._id});
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
            return res.status(200).json({message:"Ajudas encontradas com sucesso", status:200, data: ajudas});
        }
    })
};

exports.getAjudasByTen = async function(req, res){
    let num = req.params.num;

    Ajuda.find({},(err, ajudas)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            let ajudasLength = num*10;
            let result = ajudas.reverse().slice(ajudasLength-10, ajudasLength);
            return res.status(200).json({message:"Ajudas encontradas com sucesso", status:200, data: result});
        }
    })
};

exports.updateAjuda = async function (req, res) {
    let ajudaID = req.body.ajudaID;
    Ajuda.findById(ajudaID,(err, ajuda)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            let novaAjuda = new Ajuda(req.body.ajuda);
            ajuda.generalDescription = novaAjuda.generalDescription;
            ajuda.detailedDescription = novaAjuda.detailedDescription;
            ajuda.tags = novaAjuda.tags;
            ajuda.closed = novaAjuda.closed;
            ajuda.save();
            return res.status(200).json({message:"Ajuda modificada com sucesso", status:200, data: ajuda});
        }
    })
};

exports.deleteAjuda = function (req, res) {
    let removeAjudaID = req.body.ajudaID;
    Ajuda.findByIdAndRemove(removeAjudaID, (err)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            AlunoAjuda.find({"ajudaID":removeAjudaID}, function (err) {
                if(err){
                    return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
                }
            }).remove().exec();

            res.status(200).json({message:"Ajuda deletada com sucesso", status:200});
        }
    }).exec();
};


exports.putCommentAjuda = async function (req, res) {
    let userID = req.body.userID;
    let ajudaID = req.body.ajudaID;
    let comment = req.body.comments;
    Ajuda.findById(ajudaID,(err, ajuda)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        } else {
            User.findById(userID, (err, user)=>{
                if(err) {
                    return res.status(400).json({message:"Usuário não encontrado", status: 404});
                } else {
                    let nome = user.name;
                    let saida = nome + ": " + comment;
                    ajuda.comments.push(saida);
                    ajuda.save();
                    return res.status(200).json({message:"Comentário adicionado com sucessso", status:200, data: ajuda});
                }
            });
        }
    })
};

exports.deleteCommentAjuda = async function (req, res) {
    let ajudaID = req.body.ajudaID;
    let commentIndex = req.body.commentIndex;

    Ajuda.findById(ajudaID, (err, ajuda)=>{
        if(err){
            return res.status(400).json({message:"Comentário não encontrado", status: 404});
        }else{
            ajuda.comments.splice(commentIndex, 1);
            ajuda.save();
            res.status(200).json({message:"Comentário deletado com sucesso", status:200});
        }
    })
};
exports.closeAjuda = async (req, res)=>{
    let ajudaID = req.body.ajudaID;
    Ajuda.findById(ajudaID,(err, ajuda)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            ajuda.closed = req.body.closed;
            ajuda.save();
            return res.status(200).json({message:"Ajuda modificada com sucesso", status:200, data: ajuda});
        }
    })

};
