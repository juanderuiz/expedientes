angular.module('Expedientes').config(function($routeProvider){
  $routeProvider
    .when('/',{
      redirectTo: '/expedientes'
    })
    .when('/expedientes',{
      templateUrl: 'assets/templates/expedientes/index.html',
      controller: 'expedientesIndexController'
    });
});