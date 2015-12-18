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

       //app currently running, switch to it
        if(id == plyxalAppId) {
            swapApplication();

            deferred.resolve({message: 'success'});
            return defered.promise;
        }

        //TODO: if switching to new app, display confirmation message to user
        //launching new app, kill current
        if(id != plyxalAppId) {
            killPid(appPid);
        }

        var success = function(game) {
            plyxalAppId = game.id;

            var continueExecute = function() {
                executeGame(game.launchCommand)
                    .then(deferred.resolve, deferred.reject);
            };

            //found game, suspend app launcher
            if(!homePid) {
                wmctrl.list(function(err, list) {
                    //find homePid
                    for (var i in list) {
                        if (list[i].title.indexOf('gameboard-ui') > -1) {
                            homePid = list[i].pid;
                            break;
                        }
                    }

                    continueExecute();
                });
            } else {
                continueExecute();
            }
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

        homeActive = true;
        suspendPid(homePid);

        var child = exec(launchCommand, function(error, stdout, stderr) {});

        //add 1 to the pid because /bin/sh is the app running which launches what we want -psmithiv
        appPid = child.pid+1;

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
                suspendPid((homeActive ? appPid : homePid));

                //resume entering pid
                resumePid((homeActive ? homePid : appPid));

                //activeate window
                wmctrl.activate(window.id, function (err) {})
            }

            //throttle swap so that it can only happen once per second(ish)
            setTimeout(function() {
                executingSwap = false;
                homeActive = !homeActive;
            }, 1000);
        });
    };

    var suspendPid = function(pid) {
        exec('kill -STOP ' + pid, function(error, stdout, stderr) {});
    };

    var resumePid = function(pid) {
        exec('kill -CONT ' + pid, function(error, stdout, stderr) {});
    };

    var killPid = function(pid) {
        exec('kill ' + pid, function(error, stdout, stderr) {});
    };

    return {
        launch: launch,
        swapApplication: swapApplication
    }
}