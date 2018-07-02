var Ajuda = require('../models/ajuda.model');
var User = require('../models/user.model');
var AlunoAjuda = require('../models/AlunoAJuda');
var _ = require('lodash');
const mongoose = require('mongoose');

exports.mockSystem = async function (req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        console.log('Reseting Database...');
        let tiago = new User({
            name: 'Taigo Leonel',
            email: 'tiago.pereira@ccc.ufcg.edu.br',
            tutorEvaluation: 4.91,
            studentEvaluation: 2.4,
            photoURL: "https://lh6.googleusercontent.com/-Ju3JEKDDvO4/AAAAAAAAAAI/AAAAAAAAACE/UgSMzZrPrx8/photo.jpg"
        });
    
        let rubens = new User({
            name: 'Rusby',
            email: 'rubens.sousa@ccc.ufcg.edu.br',
            skills: ['EDA', 'LEDA'],
            tutorEvaluation: 5.0,
            studentEvaluation: 5.0
        });
    
        tiago.save((err, us) => {
            console.log('User tiago created...');
            rubens.save((err, us) => {
                console.log('User rubens created...');
                let helpData = {
                    generalDescription: 'Dúvida em p1',
                    author: {
                        name: tiago.name,
                        photoURL: tiago.photoURL,
                        email: tiago.email,
                        tutorEvaluation: tiago.tutorEvaluation,
                        studentEvaluation: tiago.studentEvaluation
                    },
                    detailedDescription: 'Como faço pra pegar o placar de um jogo, ex "3x1" independente de posicao, pois a posicao pode variar se o placar for 11x20',
                    answers: [
                        {
                            author: {
                                name: rubens.name,
                                photoURL: rubens.photoURL,
                                email: rubens.email,
                                tutorEvaluation: rubens.tutorEvaluation,
                                studentEvaluation: rubens.studentEvaluation
                            },
                            answer: "What is the broder",
                            photoURL: null,
                            authorID: rubens._id
                        },
                    ],
                    authorID: tiago._id
                };
            
                for(var i = 0; i < 34; i++) {
                    var x = _.cloneDeep(helpData);
                    x.generalDescription += "-" + String(i+1);
                    let help = new Ajuda(x);
                    help.save((err, us) => {console.log('help saved...')});
                    let alunoAjuda = new AlunoAjuda({alunoID: tiago._id, ajudaID: help._id});
                    alunoAjuda.save((err, us)=>{});
                }
            });
        });
    });
};