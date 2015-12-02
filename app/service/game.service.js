/**
 * Created by Paul on 8/18/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var gameDao = inject('gameDao');

    /**
     * @public
     * @returns {*|promise}
     */
    var getGames = function() {
        return gameDao.getGames();
    };

    return {
        getGames: getGames
    }
}