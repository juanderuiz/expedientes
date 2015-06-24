var express = require('express');
var app = express();

app.use(express.static('public'));

var expedientes = ["01001/15", "01002/15", "12003/15"];

app.get('/', function(req,res){
  res.send('OK');
});

app.get('/expedientes', function(req,res){
  //res.send('OK');
  res.json(expedientes);
});

//app.listen(3000);
module.exports = app;