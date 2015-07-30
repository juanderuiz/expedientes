angular.module('Expedientes').controller('expedientesIndexController', function(Expediente, $scope){
  $scope.expedientes = Expediente.query();

  console.log($scope.expedientes);  
});