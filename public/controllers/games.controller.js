angular.module("standings3")

// display standings
.controller('StandingsCtrl', ['$scope','$http', function($scope, $http){
    $http.get('/games').success(function(data){

        var refresh = function() {

        // convert games data from DB to scope variable
        $scope.games = data;

            console.log(data);

        $scope.orderByField = 'date';
        $scope.reverseSort = false;

        // convert year, month & day to date
        for (var x = 0; x < data.length; x++) {
            $scope.games[x].date = new Date(data[x].gamemonth + " " + data[x].gameday + ", " + data[x].gameyear);
        }

        // create league object for all teams
        var league = {
            Alligators: {
                name: "Alligators",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Bobcats: {
                name: "Bobcats",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Cheetahs: {
                name: "Cheetahs",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Ducks: {
                name: "Ducks",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Eagles: {
                name: "Eagles",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Falcons: {
                name: "Falcons",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Giraffes: {
                name: "Giraffes",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            Hawks: {
                name: "Hawks",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            }
        }

        // calculate standings from games data;
        for (var x = 0; x < data.length; x++) {

            league[data[x].home].gf += data[x].homeScore;
            league[data[x].visitor].gf += data[x].visitorScore;
            league[data[x].home].ga += data[x].visitorScore;
            league[data[x].visitor].ga += data[x].homeScore;
            league[data[x].home].g ++;
            league[data[x].visitor].g ++;

            if (data[x].homeScore > data[x].visitorScore) {
                league[data[x].home].w ++;
                league[data[x].visitor].l ++;
                league[data[x].home].p += 2;
            }
            else if (data[x].homeScore < data[x].visitorScore) {
                league[data[x].visitor].w ++;
                league[data[x].home].l ++;
                league[data[x].visitor].p += 2;
            }
            else if (data[x].homeScore == data[x].visitorScore) {
                league[data[x].home].t ++;
                league[data[x].visitor].t ++;
                league[data[x].home].p ++;
                league[data[x].visitor].p ++;
                }
            }

            $scope.stand = league;

        };

        refresh();

    });
}])

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

// display game by details & remove game
.controller('GameDetailsCtrl', ['$scope','$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    $http.get('/games/'+$routeParams.id).success(function(data){
        $scope.game = data;

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
