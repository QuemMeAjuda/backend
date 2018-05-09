//Author: Wesley Gonçalves Anibal
var Ajuda = require('../models/ajuda.model');
var AlunoAjuda = require('../models/AlunoAJuda')

exports.postAjuda = async function (req, res) {
    let ajuda = new Ajuda(req.body.ajuda);
    ajuda.save((err, us)=>{
        if(err){//caso dê erro
            return res.status(400).json({message:"Falha na operacao", status:400});//retornando uma msg de erro
        }else{//caso dê certo
            return res.status(201).json({message:"Ajuda cadastrada com sucesso", status:201, data: ajuda});
        }
    })

    let alunoAjuda = new AlunoAjuda({alunoID: req.body.alunoID, ajudaID: req.body.ajudaID});
    alunoAjuda.save((err, us)=>{});
};


