/**
 * Created by psmit on 2/23/2016.
 */
exports = module.exports = init;

function init(config) {
    'use strict';
    
    var restify = inject('restify');
    var volumeService = inject('volumeService');

    /**
     * @private
     * @param req
     * @param res
     * @param next
     */
    var getVolume = function (req, res, next) {
        var success = function(result) {
            res.send({value: result});
        };

        var fail = function(error) {
            res.send({error: 'error'});
        };

        volumeService.getVolume()
            .then(success, fail);
    };

    /**
     * @private
     * @param req
     * @param res
     * @param next
     */
    var putVolume = function (req, res, next) {
        var success = function(result) {
            res.send({value: result});
        };

        var fail = function(error) {
            res.send({error: 'error'});
        };

        volumeService.putVolume(req.params.value)
            .then(success, fail);
    };

    /**
     * @constructor
     */
    (function(){
        restify.get('/volume', getVolume);
        restify.put('/volume/:value', putVolume);
    }())
}