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

    /**
     *
     * @param id
     * @returns {{set, expr}|*|{ID, NAME, TAG}}
     */
    var getGameById = function(id) {
        console.log('game.dao::getGameById:id: ', id);
        return gameModel.find({
            where: {
                id: id
            }
        });
    };

    /**
     *
     * @param game
     * @returns {Promise.<Instance, created>}
     */
    var seedGame = function(game) {
        return gameModel.findOrCreate({
            where: {
                route: game.route
            },
            defaults: game
        });
    };

    /**
     *
     * @returns {*|Promise.<Integer>|Promise.<undefined>}
     */
    var destroyAll = function() {
        return gameModel.destroy({
            where: {}
        });
    };

    return {
        getGames: getGames,
        getGameById: getGameById,
        seedGame: seedGame,
        destroyAll: destroyAll
    }
}