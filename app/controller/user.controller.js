/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var restify = inject('restify');
    var userService = inject('userService');

    /**
     * @private
     * @param req
     * @param res
     * @param next
     */
    var createUser = function (req, res, next) {
        var success = function(result) {
            console.log('user.controller::createUser::success: ', result);
            res.send(result);
        };

        var fail = function(error) {
            //TODO
            res.send(error);
        };

        userService.createUser(req.body)
            .then(success, fail);
    };

    /**
     * @constructor
     */
    (function(){
        restify.post('/user', createUser);
    }())
}