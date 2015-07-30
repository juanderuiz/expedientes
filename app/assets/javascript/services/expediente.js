angular.module('Expedientes').factory('Expediente', function($resource){
    return $resource('/expedientes/:id',
                       {id: '@id'}, {
                        'query':  { method:'GET', isArray:true },
                        'update': { method: 'PUT' }
                       });
});