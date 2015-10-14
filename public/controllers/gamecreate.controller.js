angular.module("standings3")

// add new game
.controller('GameCreateCtrl', ['$scope','$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){

    $scope.teams = ["Alligators", "Bobcats", "Cheetahs", "Ducks", "Eagles", "Falcons", "Giraffes", "Hawks"];

    $scope.years = [2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

    $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    $scope.addGame = function(){
        var data = {
            gameyear:       $scope.gameyear,
            gamemonth:      $scope.gamemonth,
            gameday:        $scope.gameday,
            visitor:        $scope.visitor,
            visitorScore:   $scope.visitorScore,
            home:           $scope.home,
            homeScore:      $scope.homeScore,
            notes:          $scope.notes
        }

        $http.post('/games', data).success(function(data, status){
            console.log(status);
        });

        $location.path('/games');
    }
}])

