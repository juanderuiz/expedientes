angular.module('Expedientes').config(function($routeProvider){
  $routeProvider
    .when('/',{
      redirectTo: '/expedientes'
    })
    .when('/expedientes',{
      templateUrl: 'assets/templates/expedientes/index.html',
      controller: 'expedientesIndexController'
    })
    .when('/expedientes/new',{
      templateUrl: 'assets/templates/expedientes/new.html',
      controller: 'expedientesNewController'
    })
    .when('/expedientes/:id',{
      templateUrl: 'assets/templates/expedientes/show.html',
      controller: 'expedientesShowController'
    });
});