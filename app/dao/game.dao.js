/**
 * Created by Paul on 8/18/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var gameModel = inject('gameModel');

    /**
     * @public
     * @param user
     * @returns {*|promise}
     */
    var getGames = function() {
        console.log('game.dao::getGames');

        return gameModel.findAll();
    };

    var seedGame = function(game) {
        return gameModel.findOrCreate({
            where: {
                route: game.route
            },
            defaults: game
        });
    };

    var destroyAll = function() {
        return gameModel.destroy({
            where: {}
        });
    };

    return {
        getGames: getGames,
        seedGame: seedGame,
        destroyAll: destroyAll
    }
}