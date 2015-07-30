angular.module('Expedientes').controller('expedientesShowController', function(Expediente, $scope, $routeParams, $location){
  $scope.expediente = Expediente.get({id: $routeParams.id});

  console.log($scope.expediente);  

  $scope.deleteExpediente = function(num,anyo){
    var x = window.confirm("Are you sure?");
    var exp = num + "" + anyo;
    console.log("Tratando de borrar " + exp + "/" + anyo);
    if (x){
      Expediente.delete({id: exp});
      console.log($scope.expediente.numero + " eliminado!");
      $location.path('/expedientes');
    } else {
      console.log("Abortando eliminar expediente " + $scope.expediente.numero);
    }
  };

});