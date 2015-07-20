var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

//MongoDB and Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/expedientes');

var expedienteSchema = {
  numero:String,
  anyo: String,
  asunto: String
};

var Expediente = mongoose.model('Expediente', expedienteSchema);

//Views middleware
app.use("/", express.static('app/'));

app.set('views', __dirname + '/../expedientes/app/views');

//Helper methods

var separarNumero = function(numExp){
  // El número de expediente 123456/77, será numero 123456 y anyo 77
  return numExp.split("/",2);
};


//Router
app.get('/', function(req,res){
  res.sendFile('index.html', {root: app.settings.views});
});

app.get('/expedientes', function(req,res){
  var query = {}, projection = {'numero':1, 'anyo':1, '_id':0};
  Expediente.find(query, projection, function(err,docs){
    if(err) throw err;

    docs = docs.map(function(doc) { return {"numero": doc.numero, 
                                              "anyo": doc.anyo} });
    res.json(docs);
  });
});

app.post('/expedientes', urlencode, function(req,res){
  var newExp = req.body;
  var nuevoValor = separarNumero(newExp.numero);
  newExp.numero = nuevoValor[0];
  newExp.anyo = nuevoValor[1];
  //Compruebo que el número y el asunto del expediente se han completado
  if (!newExp.numero || !newExp.anyo || !newExp.asunto){
    console.log("Faltan datos en el expediente!");
    res.sendStatus(400);
    return false;
  }

  //Compruebo si no existe previamente
  var query = {'numero': newExp.numero, 'anyo': newExp.anyo};
  Expediente.find(query, function (err, docs){
    if (err || docs.length){
      console.log("El expediente ya existe!");
    } else {
      //Eliminar la barra separadora "/" antes de guardar
      //Si NO existe, lo añado a la colección
      var expediente = new Expediente( {"numero": newExp.numero,
                           "anyo": newExp.anyo, "asunto": newExp.asunto });

      expediente.save(function(err, inserted){
          if(err) throw err;

          console.dir("Expediente guardado!" + JSON.stringify(inserted));
          res.status(201).json(newExp.numero);
      });
    };
  });
});

app.get('/expedientes/:numero', function(req,res){
  var parametro = parseInt(req.params.numero);
  var numero = (Math.floor(parametro/100)).toString();
  var anyo = (parametro%100).toString();
  var query = {'numero' : numero, 'anyo': anyo};

  Expediente.findOne(query, function (err,doc){
    if(err) throw err;

    if(!doc){
      console.log("NOT FOUND expediente: " + numero + '/' + anyo);
      res.status(404).json("NOT FOUND!" + req.params.numero);
    } else {
      console.log("Expediente número " + doc.numero + '/' + doc.anyo + " recuperado!");
      res.status(200).json(doc);
    }  
  });
});

app.delete('/expedientes/:numero', function(req,res){
  var parametro = parseInt(req.params.numero);
  var numero = (Math.floor(parametro/100)).toString();
  var anyo = (parametro%100).toString();
  var query = {'numero' : numero, 'anyo': anyo};

  Expediente.remove(query, function(err){
    if(err) throw err;

    console.log("Borrado el expediente número: " + numero + '/' + anyo);
    res.sendStatus(204);

  });

});

//app.listen(3000);
module.exports = app;