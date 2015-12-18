/**
 * Created by Paul on 8/18/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';
    var restify = inject('restify');
    var gameService = inject('gameService');

    /**
    * @private
    * @param req
    * @param res
    * @param next
    */
    var getGames = function (req, res, next) {
        var success = function(result) {
            //scrub launch commands from response -psmithiv
            var len = result.length;
            for(var i=0; i<len; i++) {
                var item = result[i];
                delete item.launchCommand;
            }

            res.send(result);
        };

        var fail = function(error) {
            res.send({error: 'error'});
        };

        gameService.getGames()
            .then(success, fail);
    };

    /**
     * @constructor
     */
    (function(){
        restify.get('/game', getGames);
    }())
}