/**
 * Created by psmit on 5/25/2016.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var restify = inject('restify');
    var brightnessService = inject('brightnessService');

    /**
     * @private
     * @param req
     * @param res
     * @param next
     */
    var getBrightness = function (req, res, next) {
        var success = function(result) {
            res.send({value: result * 100});
        };

        var fail = function(error) {
            res.send(error);
        };

        brightnessService.getBrightness()
            .then(success, fail);
    };

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    var putBrightness = function (req, res, next) {
        var success = function(result) {
            res.send({value: result});
        };

        var fail = function(error) {
            res.send(error);
        };

        brightnessService.putBrightness(req.params.value)
            .then(success, fail);
    };

    /**
     * @constructor
     */
    (function(){
        restify.get('/brightness', getBrightness);
        restify.put('/brightness/:value', putBrightness);
    }())
}