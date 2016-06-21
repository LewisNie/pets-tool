var express = require('express');
var router = express.Router();
var jsondata = require("../public/data.json");

router.get('/public/:petType/:selectedCategory/:selectedSubCategory',function(req,res,next){
    var data = jsondata;
    var petType = req.params.petType;
    var selectedCategory=parseInt( req.params.selectedCategory);
    var selectedSubCategory = parseInt(req.params.selectedSubCategory);
    var ret = [];
    var result={
        result:ret
    }
    data.forEach(function(e){
       var match =true;
        if(!!e.pet){
            if(e.pet!=petType){
                match=false;
                return;
            }
        }
        if(e.category>=0){
            if(selectedCategory!= -1){
                if(e.category!=selectedCategory){
                    match =false;
                    return;
                }
            }
        }
        if(e.subcategory>=0){
            if(selectedSubCategory!=-1){
                if(e.subcategory!=selectedSubCategory){
                    match=false;
                    return;
                }
            }
        }
        if(!!match){
            ret.push(e);
        }
    });
    res.end(JSON.stringify(result));
});

module.exports = router;