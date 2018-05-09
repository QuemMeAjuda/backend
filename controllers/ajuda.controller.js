//Author: Wesley Gonçalves Anibal
var Ajuda = require('../models/ajuda.model');


exports.postAjuda = async function (req, res) {

};


exports.getAjuda = function (req, res) {
    Ajuda.findById(req.params.id, (err, user)=>{
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

exports.getAllUsers = function (req, res) {
    User.find({}, (err, users)=>{
        if(err){
            res.status(400).json({message:"Falha na operação", status:400});
        }else{
            res.status(200).json({message:"users encontrados com sucesso",status:200,data:users});
        }
    })
};

