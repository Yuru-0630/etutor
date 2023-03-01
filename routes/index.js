var express = require('express');
var router = express.Router();

const scoreData = require('../data.json');

var bodyParser = require('body-parser');
 var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    id: "",
    score: ""
  });
});

router.post('/query', urlencodedParser, function(req, res, next) {
  // res.send(req.body.code)

  let result = scoreData.filter(value => value.id === req.body.code) 
  res.render('index', {
    id: req.body.code,
    score: result.length === 0 ? "不存在" : result[0].score
  })
});

module.exports = router;
