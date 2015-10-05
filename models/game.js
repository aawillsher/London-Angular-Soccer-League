var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    gameyear: {
        type: Number,
        index: true,
        required: true
    },
    gamemonth: {
        type: String,
        required: true
    },
    gameday: {
        type: Number,
        required: true
    },
    visitor: {
        type:String,
        required: true
    },
    visitorScore: {
        type:Number,
        required: true
    },
    home: {
        type:String,
        required: true
    },
    homeScore: {
        type:Number,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
});

var Game = module.exports = mongoose.model('Game', gameSchema);

// Get All
module.exports.getGames = function(callback){
    Game.find(callback);
}

// Get By ID
module.exports.getGameById = function(id, callback){
    Game.findById(id, callback);
}

// Add
module.exports.createGame = function(newGame, callback){
    newGame.save(callback);
}

// Update
module.exports.updateGame = function(id, data, callback){
    var gameyear        = data.gameyear;
    var gamemonth       = data.gamemonth;
    var gameday         = data.gameday;
    var visitor         = data.visitor;
    var visitorScore    = data.visitorScore;
    var home            = data.home;
    var homeScore       = data.homeScore;
    var notes           = data.notes;

    var query = {_id: id};

    Game.findById(id, function(err, game){
        if(!game){
            return next(new Error('Could not load game'));
        } else {
            // Update
            game.gameyear       = gameyear;
            game.gamemonth      = gamemonth;
            game.gameday        = gameday;
            game.visitor        = visitor;
            game.visitorScore   = visitorScore;
            game.home           = home;
            game.homeScore      = homeScore;
            game.notes          = notes;

            game.save(callback);
        }
    });
}

// Remove
module.exports.removeGame = function(id, callback){
    Game.find({_id: id}).remove(callback);
}
