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
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! launch game');

        var success = function(result) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! launch game success');
            res.send(result);
        };

        var fail = function(error) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! launch game fail');
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