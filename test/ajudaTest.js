const assert = require('chai').assert;
const ajudaCont = require('../controllers/ajuda.controller');
const ajudaMod = require('../models/ajuda.model');

describe('Ajuda', function () {


    it('postAjuda', function () {
        let result = ajudaCont.postAjuda();
        ajudaMod.isPrototypeOf(result);
    })
    
})