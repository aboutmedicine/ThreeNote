var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
            controller: 'NotesController',
            templateUrl: 'views/notes.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});