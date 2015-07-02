var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

//MongoDB and Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/expedientes');

var expedienteSchema = {
  numero:String,
  asunto: String
};

var Expediente = mongoose.model('Expediente', expedienteSchema);

//Views middleware
app.use(express.static('public'));

//Helper methods


//Router
app.get('/', function(req,res){
  res.send('OK');
});

app.get('/expedientes', function(req,res){
  var query = {}, projection = {'numero':1, '_id':0};
  Expediente.find(query, projection, function(err,docs){
    if(err) throw err;

    docs = docs.map(function(doc) { return doc.numero; });
    res.json(docs);
  });
});

app.post('/expedientes', urlencode, function(req,res){
  var newExp = req.body;
  //Compruebo que el número y el asunto del expediente se han completado
  if (!newExp.numero || !newExp.asunto){
    console.log("Faltan datos en el expediente!");
    res.sendStatus(400);
    return false;
  }

  //Compruebo si no existe previamente
  var query = {'numero': newExp.numero};
  Expediente.find(query, function (err, docs){
    if (err || docs.length){
      console.log("El expediente ya existe!");
    } else {
      //Si NO existe, lo añado a la colección
      var expediente = new Expediente( {"numero": newExp.numero,
                    "asunto": newExp.asunto });

      expediente.save(function(err, inserted){
          if(err) throw err;

          console.dir("Expediente guardado!" + JSON.stringify(inserted));
          res.status(201).json(newExp.numero);
      });
    };
  });
});

app.delete('/expedientes/:numero', function(req,res){
  var numero = req.params.numero;
  var query = {'numero' : numero};

  Expediente.remove(query, function(err){
    if(err) throw err;

    console.log("Borrado el expediente número: " + numero);
    res.sendStatus(204);

  });

});

//app.listen(3000);
module.exports = app;