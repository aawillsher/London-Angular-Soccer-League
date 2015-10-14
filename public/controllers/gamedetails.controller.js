angular.module("standings3")

// display game by details & remove game
.controller('GameDetailsCtrl', ['$scope','$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    $http.get('/games/'+$routeParams.id).success(function(data){
        $scope.game = data;
        $scope.team = $routeParams.id;

        for (var x = 0; x < data.length; x++) {
            $scope.games[x].date = new Date(data[x].gamemonth + " " + data[x].gameday + ", " + data[x].gameyear);
        }
    });

    $scope.removeGame = function(){
        $http.delete('/games/'+$routeParams.id).success(function(data){
            console.log(data);
        });
        window.location.assign('/');
    }
}])
