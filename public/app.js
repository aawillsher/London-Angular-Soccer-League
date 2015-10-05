var app = angular.module('standings3',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.

        when('/games',{
            templateUrl: 'views/games.view.html',
            controller: 'GamesCtrl'
        }).

        when('/games/details/:id',{
            templateUrl: 'views/game_details.view.html',
            controller: 'GameDetailsCtrl'
        }).

        when('/games/add',{
            templateUrl: 'views/add_game.view.html',
            controller: 'GameCreateCtrl'
        }).

        when('/games/edit/:id',{
            templateUrl: 'views/edit_game.view.html',
            controller: 'GameEditCtrl'
        }).

        otherwise({redirectTo: '/games'})
}]);

