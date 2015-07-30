angular.module('Expedientes').controller('expedientesNewController', function(Expediente, $scope, $location){
  $scope.expediente = new Expediente();
  $scope.missingInfo = false;

  $scope.saveExpediente = function(exp){
      console.log("Intentando guardar el expediente...");
      var datosExp = separarNumero(exp.numero);
      var numero = datosExp[0], anyo = datosExp[1];
      console.log(numero + " y " + anyo);

      //Check that numero has 5 cyphers and anyo has 2 cyphers
      var hasFive = (numero.length == 5), hasTwo = (anyo.length == 2);
      

      if (!numero || !anyo || !exp.asunto || !hasFive || !hasTwo){
        $scope.missingInfo = true;
        console.log("Missing or bad info!");
        //Con un ng-show mostrar un aviso
      } else {
        exp.numero = numero;
        exp.anyo = anyo;
        //exp.asunto already exists
        $scope.missingInfo = false;
        //console.log(exp);
        Expediente.save(exp);
        console.log("Saved ok!")
        $location.path('/expedientes');
      }
  };

  var separarNumero = function(numExp){
    // El número de expediente 123456/77, será numero 123456 y anyo 77
    return numExp.split("/",2);
  };

});