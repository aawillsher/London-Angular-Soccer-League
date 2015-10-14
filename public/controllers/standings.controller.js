angular.module("standings3")

// display standings
.controller('StandingsCtrl', ['$scope','$http', function($scope, $http){
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

        // create league object for all teams
        var league = [
            {
                name: "Alligators",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Bobcats",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Cheetahs",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Ducks",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Eagles",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Falcons",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Giraffes",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            },
            {
                name: "Hawks",
                w: 0,
                l: 0,
                t: 0,
                gf: 0,
                ga: 0,
                p: 0,
                g: 0
            }
        ];

        // calculate standings from games data;

        var teams = ["Alligators", "Bobcats", "Cheetahs", "Ducks", "Eagles", "Falcons", "Giraffes", "Hawks"];

        for (var x = 0; x < data.length; x++) {

            league[teams.indexOf(data[x].home)].gf += data[x].homeScore;
            league[teams.indexOf(data[x].visitor)].gf += data[x].visitorScore;
            league[teams.indexOf(data[x].home)].ga += data[x].visitorScore;
            league[teams.indexOf(data[x].visitor)].ga += data[x].homeScore;
            league[teams.indexOf(data[x].home)].g ++;
            league[teams.indexOf(data[x].visitor)].g ++;

            if (data[x].homeScore > data[x].visitorScore) {
                league[teams.indexOf(data[x].home)].w ++;
                league[teams.indexOf(data[x].visitor)].l ++;
                league[teams.indexOf(data[x].home)].p += 2;
            }
            else if (data[x].homeScore < data[x].visitorScore) {
                league[teams.indexOf(data[x].visitor)].w ++;
                league[teams.indexOf(data[x].home)].l ++;
                league[teams.indexOf(data[x].visitor)].p += 2;
            }
            else if (data[x].homeScore == data[x].visitorScore) {
                league[teams.indexOf(data[x].home)].t ++;
                league[teams.indexOf(data[x].visitor)].t ++;
                league[teams.indexOf(data[x].home)].p ++;
                league[teams.indexOf(data[x].visitor)].p ++;
                }
            }

            $scope.league = league;

        };

        refresh();

    });
}])
