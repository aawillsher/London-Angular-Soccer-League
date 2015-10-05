var express = require('express');
var router = express.Router();

var Game = require('../models/game');

router.get('/', function(req, res, next) {
  Game.getGames(function(err, games){
      if(err){
          console.log(err);
      }
      res.json(games);
  });
});

router.get('/:id', function(req, res, next) {
  Game.getGameById(req.params.id, function(err, game){
      if(err){
          console.log(err);
      }
      res.json(game);
  });
});


router.post('/', function(req, res, next){
    // Get Form Values
    var gameyear        = req.body.gameyear;
    var gamemonth       = req.body.gamemonth;
    var gameday         = req.body.gameday;
    var visitor         = req.body.visitor;
    var visitorScore    = req.body.visitorScore;
    var home            = req.body.home;
    var homeScore       = req.body.homeScore;
    var notes           = req.body.notes;

    // Game Object
    var newGame = new Game({
        gameyear:       gameyear,
        gamemonth:      gamemonth,
        gameday:        gameday,
        visitor:        visitor,
        visitorScore:   visitorScore,
        home:           home,
        homeScore:      homeScore,
        notes:          notes
    });

    // Create game
    Game.createGame(newGame, function(err, game){
        if(err){
            console.log(err);
        }

        res.location('/games');
        res.redirect('/games');
    });
});


// Update game
router.put('/', function(req, res, next){
    var id	= req.body.id;
    var data = {
        gameyear:       req.body.gameyear,
        gamemonth:      req.body.gamemonth,
        gameday:        req.body.gameday,
        visitor:        req.body.visitor,
        visitorScore:   req.body.visitorScore,
        home:           req.body.home,
        homeScore:      req.body.homeScore,
        notes:          req.body.notes
    };

    // Create game
    Game.updateGame(id, data, function(err, game){
        if(err){
             console.log(err);
         }

        res.location('/games');
        res.redirect('/games');
    });
});

// Remove game
router.delete('/:id', function(req, res, next){
    var id	= req.params.id;

    Game.removeGame(id, function(err, game){
        if(err){
             console.log(err);
         }

        res.location('/games');
        res.redirect('/games');
    });
});

module.exports = router;
