angular.module("standings3")

// edit game
.controller('GameEditCtrl', ['$scope','$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){

    $scope.teams = ["Alligators", "Bobcats", "Cheetahs", "Ducks", "Eagles", "Falcons", "Giraffes", "Hawks"];

    $scope.years = [2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

    $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    $http.get('/games/'+$routeParams.id).success(function(data){
        $scope.game = data;
    });

    $scope.updateGame = function(){
        var data = {
            id:    		   $routeParams.id,
            gameyear:      $scope.game.gameyear,
            gamemonth:     $scope.game.gamemonth,
            gameday:       $scope.game.gameday,
            visitor: 	   $scope.game.visitor,
            visitorScore:  $scope.game.visitorScore,
            home:          $scope.game.home,
            homeScore:     $scope.game.homeScore,
            notes:         $scope.game.notes
        }

        $http.put('/games', data).success(function(data, status){
            console.log(status);
            console.log(data);
        });

        $location.path('/');
    }
}])
