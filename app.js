var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

//MongoDB
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/expedientes');

var expedienteSchema = {
  numero:String,
  asunto: String
};

var Expediente = mongoose.model('Expediente', expedienteSchema);

app.use(express.static('public'));

app.get('/', function(req,res){
  res.send('OK');
});

app.get('/expedientes', function(req,res){
  //res.send('OK');
  //res.json(Object.keys(expedientes)); //Keys are the number of each expediente
  var query = {}, projection = {'numero':1, '_id':0};
  Expediente.find(query, projection, function(err,docs){
    if(err) throw err;

    docs = docs.map(function(doc) { return doc.numero; });
    res.send(docs);
  });
});

app.post('/expedientes', urlencode, function(req,res){
  var newExp = req.body;
  var expediente = new Expediente( {"numero": newExp.numero,
                "asunto": newExp.asunto });

  expediente.save(function(err, inserted){
      if(err) throw err;

      console.dir("Expediente guardado!" + JSON.stringify(inserted));
      res.status(201).send(newExp.numero);
      //callback(err, newExp.numero); //Usamos el numero del objeto original
  });
});

//app.listen(3000);
module.exports = app;