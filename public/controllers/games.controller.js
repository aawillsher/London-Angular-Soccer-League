angular.module("standings3")

// display games
.controller('GamesCtrl', ['$scope','$http', function($scope, $http){
    $http.get('/games').success(function(data){

        var refresh = function() {

        // convert games data from DB to scope variable
        $scope.games = data;

        $scope.orderByField = 'name';
        $scope.reverseSort = false;

        // convert year, month & day to date
        for (var x = 0; x < data.length; x++) {
            $scope.games[x].date = new Date(data[x].gamemonth + " " + data[x].gameday + ", " + data[x].gameyear);
        }

            }

        refresh();

    });
}])
