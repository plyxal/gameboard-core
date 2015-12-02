/**
 * Created by Paul on 8/10/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    var restify = require('restify');

    /**
     * @private
     */
    var server;

    /**
     * @constructor
     */
    (function(){
        server = restify.createServer({
            name: config.name,
            version: config.version
        });

        if(config.useCORS) {
            server.use(
                function crossOrigin(req,res,next){
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    return next();
                }
            );
        }

        server.use(restify.acceptParser(server.acceptable));
        server.use(restify.queryParser());
        server.use(restify.bodyParser());

        server.listen(config.port, function () {
            console.log('%s listening at %s', server.name, server.url);
        });
    }());

    return server;
}