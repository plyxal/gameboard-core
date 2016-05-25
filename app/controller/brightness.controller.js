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
            console.log('brightness.controller::getBrightness::success: ', result);
            res.send(result);
        };

        var fail = function(error) {
            console.log('brightness.controller::getBrightness::fail: ', error);
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
    var setBrightness = function (req, res, next) {
        var success = function(result) {
            console.log('brightness.controller::setBrightness::success: ', result);
            res.send(result);
        };

        var fail = function(error) {
            console.log('brightness.controller::setBrightness::fail: ', error);
            res.send(error);
        };

        brightnessService.getBrightness(req.params.value)
            .then(success, fail);
    };

    /**
     * @constructor
     */
    (function(){
        restify.get('/brightness', getBrightness);
    }())
}