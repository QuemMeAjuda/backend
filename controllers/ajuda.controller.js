//Author: Wesley Gonçalves Anibal
var Ajuda = require('../models/ajuda.model');
var AlunoAjuda = require('../models/AlunoAJuda');
var User = require('../models/user.model');
var _ = require('lodash');

exports.postAjuda = async function (req, res) {
    let ajuda = new Ajuda(req.body);
    ajuda.save((err, us)=>{
        if(err){//caso dê erro
            return res.status(400).json({message:"Falha na operacao", status:400});//retornando uma msg de erro
        }else{//caso dê certo
            return res.status(201).json({message:"Ajuda cadastrada com sucesso", status:201, data: ajuda});
        }
    })
    let alunoAjuda = new AlunoAjuda({alunoID: ajuda.authorID, ajudaID: ajuda._id});
    alunoAjuda.save((err, us)=>{});
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

exports.getHelpsByUser = async function(req, res) {
    Ajuda.find({authorID : req.params.authorID}, (err, ajudas)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            return res.status(200).json({message:"Ajudas encontradas com sucesso", status:200, data: ajudas});
        }
    })
}
function getIntervalOfHelps(beginInterval, endInterval, helps) {
    if(endInterval <= helps.length) {
        return _.reverse(helps).slice(beginInterval, endInterval);
    } else if(endInterval > helps.length && beginInterval < helps.length) {
        return _.reverse(helps).slice(beginInterval, helps.length);
    } else {
        return [];
    }
}

exports.getAjudasByTen = async function(req, res){
    let num = req.params.num;

    Ajuda.find({},(err, ajudas)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        }else{
            let ajudasLength = (Number(num)+1)*10;
            const aux = _.cloneDeep(ajudas);
            let result = getIntervalOfHelps(ajudasLength - 10, ajudasLength, aux);
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
            ajuda.answers = novaAjuda.answers;
            ajuda.closed = novaAjuda.closed;
            ajuda.save();
            return res.status(200).json({message:"Ajuda modificada com sucesso", status:200, data: ajuda});
        }
    })
};

exports.deleteAjuda = async function (req, res) {
    let removeAjudaID = req.params.id;
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

exports.putAnswer = async function (req, res) {
    let ajudaID = req.params.id;
    let answer = req.body;
    Ajuda.findById(ajudaID,(err, ajuda)=>{
        if(err){
            return res.status(400).json({message:"Nenhuma ajuda encontrada", status:400});
        } else {
            ajuda.answers.push(answer);
            ajuda.save();
            return res.status(200).json({message:"Comentário adicionado com sucessso", status:200, data: ajuda});
        }
    })
};

exports.deleteAnswer = async function (req, res, next) {
    let ajudaID = req.params.id;
    let answerIndex = req.body;
    Ajuda.findById(ajudaID, (err, ajuda)=>{
        if(err){
            return res.status(400).json({message:"Comentário não encontrado", status: 404});
        }else{
            ajuda.answers.splice(answerIndex, 1);
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
