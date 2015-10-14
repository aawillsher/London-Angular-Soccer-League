angular.module("standings3")

// display all games for a team
.controller('TeamGamesCtrl', ['$scope','$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    $http.get('/games/').success(function(data){

        // create empty array to store a team's games
        var teamGames = [];

        // loop through all games and find games where the team is either home or away
        for (var x = 0; x < data.length; x++) {
            if (data[x].home == $routeParams.id || data[x].visitor == $routeParams.id) {
                teamGames.push(data[x]);
            }
        }

        for (var y = 0; y < teamGames.length; y++) {
            teamGames[y].date = new Date(teamGames[y].gamemonth + " " + teamGames[y].gameday + ", " + teamGames[y].gameyear);
        }

        //convert to Angular scope data
        $scope.teamGames = teamGames;

        $scope.team = $routeParams.id;

    });

    $scope.removeGame = function(){
        $http.delete('/games/'+$routeParams.id).success(function(data){
            console.log(data);
        });
        window.location.assign('/');
    }
}])
