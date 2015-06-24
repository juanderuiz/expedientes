var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

var expedientes = {"01001/15" : "Clausula Suelo",
 "01002/15" : "Monitorio Pepa López",
  "12003/15" : "Estafa Vodafone"};

app.get('/', function(req,res){
  res.send('OK');
});

app.get('/expedientes', function(req,res){
  //res.send('OK');
  res.json(Object.keys(expedientes));
});

app.post('/expedientes', urlencode, function(req,res){
  var newExp = req.body;
  expedientes[newExp.numero] = newExp.asunto;
  res.status(201).json(newExp.numero);
});

//app.listen(3000);
module.exports = app;