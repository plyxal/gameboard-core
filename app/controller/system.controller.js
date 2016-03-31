/**
 * Created by Paul on 8/10/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';
    var restify = inject('restify');
    var systemService = inject('systemService');

    /**
     * @private
     * @param req
     * @param res
     * @param next
     */
    var launch = function (req, res, next) {
        var success = function(result) {
            res.send(result);
        };

        var fail = function(error) {
            res.send({error: 'error'});
        };

        systemService.launch(req.params.id)
            .then(success, fail);
    };

    /**
     * @constructor
      */
    (function(){
        restify.post('/system/launch/:id', launch);
    }())
}