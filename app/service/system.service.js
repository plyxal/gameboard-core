/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var exec = require('child_process').exec;
    var wmctrl = require('wmctrl');
    var gameDao = inject('gameDao');

    /**
     * is the home screen active
     */
    var homeActive = true;

    /**
     * pid of home application
     */
    var homePid;

    /**
     * currently running applications plyxal app id
     */
    var plyxalAppId;

    /**
     * pid of currently running application
     */
    var appPid;

    /**
     * executing swap?
     */
    var executingSwap = false;

    /**
     * @public
     * @param {String} name
     * @returns {*|promise}
     */
    var launch = function(id) {
        var deferred = Q.defer();

        //TODO: look to see if running app id matches the id we want to launch. if it does, witch to running app -psmithiv
        if(plyxalAppId == id) {

        }

        var success = function(game) {
            plyxalAppId = game.id;

            executeGame(game.launchCommand)
                .then(deferred.resolve, deferred.reject);
        };

        var error = function(error) {
            deferred.reject({error: 'invalid game id'});
        };

        gameDao.getGameById(id)
            .then(success, error);

        return deferred.promise;
    };

    /**
     *
     * @param game
     * @returns {*|promise}
     */
    var executeGame = function(launchCommand) {
        var deferred = Q.defer();

        var child = exec(launchCommand, function(error, stdout, stderr) {});

        //add 1 to the pid because /bin/sh is the app running which launches what we want -psmithiv
        appPid = child.pid+1;

        console.log('homePid: ', homePid);

        deferred.resolve({message: 'success'});

        return deferred.promise;
    };

    /**
     * @public
     */
    var swapApplication = function() {
        if(executingSwap || !appPid)
            return;

        executingSwap = true;

        var window;
        wmctrl.list(function(err, list) {
            var len = list.length;

            //if we don't yet know teh homePid, find it
            if(!homePid) {
                for(var i in list) {
                    if(list[i].title.indexOf('gameboard-ui') > -1) {
                        homePid = list[i].pid;
                        break;
                    }
                }
            }

            //determine if we should go home or back to app
            var pid = homeActive ? homePid : appPid;

            //find window by pid
            for(var ii in list) {
                if(list[ii].pid == pid) {
                    window = list[ii];
                    break
                }
            }

            //if we found the window we want, make it active
            if(window) {
                //suspend exiting pid
                exec('kill -STOP ' + (homeActive ? appPid : homePid), function(error, stdout, stderr) {});

                //resume entering pid
                exec('kill -CONT ' + (homeActive ? homePid : appPid), function(error, stdout, stderr) {});

                //activeate window
                wmctrl.activate(window.id, function (err) {
                    console.log('wmctrl callback: ', err)
                })
            }

            //throttle swap so that it can only happen once per second(ish)
            setTimeout(function() {
                executingSwap = false;
                homeActive = !homeActive;
            }, 1000);
        });
    };

    return {
        launch: launch,
        swapApplication: swapApplication
    }
}