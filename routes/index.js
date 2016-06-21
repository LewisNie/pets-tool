var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dog',function(req,res,next){
    res.render('dog',{ title: 'Express' });
});

router.get('/cat', function (req,res,next) {
    res.render('cat',{ title: 'Express'});
});

module.exports = router;
