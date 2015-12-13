/**
 * Created by Paul on 8/10/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var exec = require('child_process').exec;
    var wmctrl = require('wmctrl');

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
    var launch = function(command) {
        var deferred = Q.defer();

        //TODO: look to see if running app id matches the id we want to launch. if it does, witch to running app -psmithiv
        var child = exec(command, function(error, stdout, stderr) {
            //console.log('error: ', error);
            //console.log('stdout: ', stdout);
            //console.log('stderr: ', stderr);
        });

        appPid = child.pid+1; //add 1 to the pid because /bin/sh is the app running which launches what we want -psmithiv

        //TODO -psmithiv
        deferred.resolve();

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
                //TODO: suspend exiting pid
                //TODO: resume entering pid
                wmctrl.activate(window.id, function (err) {
                    console.log('wmctrl callback: ', err)
                })
            }

            //throttle button so that it can only be pressed once per second(ish)
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