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

    //var homePid;
    //var homeActive = true;
    //
    //var gameModel = {};
    //var childProcess;
    //
    //var swappingApplication = false;
    //
    //var launch = function(gameId) {
    //    var deferred = Q.defer();
    //
    //    if(gameModel && gameId == gameModel.id) {
    //        swapApplication()
    //            .then(deferred.resolve);
    //    } else {
    //        getLaunchCommand(gameId)
    //            .then(killChildProcess)
    //            .then(suspendHome)
    //            .then(executeLaunchCommand)
    //            .then(deferred.resolve);
    //    }
    //
    //    return deferred.promise;
    //    //if gameId == running game id
    //        //swap
    //    //else
    //        //get launch command for gameId
    //
    //        //kill current game
    //
    //        //suspend 'home'
    //
    //        //launch game
    //};
    //
    //var swapApplication = function() {
    //    var deferred = Q.defer();
    //
    //    if(!homePid || !childProcess || swappingApplication) {
    //        deferred.reject();
    //        return deferred.promise;
    //    }
    //
    //    console.log('system.service::swapApplication');
    //    console.log('system.service::swapApplication::homePid: ', homePid);
    //    console.log('system.service::swapApplication::childProcess: ', childProcess);
    //    console.log('system.service::swapApplication::swappingApplication: ', swappingApplication);
    //
    //    swappingApplication = true;
    //
    //    var swapWindow = function(pid) {
    //        wmctrl.list(function(err, list) {
    //            //find window by pid
    //            for (var window in list) {
    //                if (list[window].pid == pid) {
    //                    wmctrl.activate(window.id, function (err) {
    //                        console.log('system.service::swapApplication::swapWindow::error: ', err);
    //                    });
    //
    //                    break;
    //                }
    //            }
    //
    //            deferred.resolve();
    //        });
    //    };
    //
    //    if(homeActive) {
    //        homeActive = false;
    //
    //        suspendHome();
    //        resumeApp();
    //
    //        swapWindow(childProcess.pid);
    //    } else {
    //        homeActive = true;
    //
    //        suspendApp();
    //        resumeHome();
    //
    //        swapWindow(homePid);
    //    }
    //
    //    setTimeout(function() {
    //        swappingApplication = false;
    //        console.log('set swappingApplication = false');
    //    }, 1000);
    //
    //    return deferred.promise;
    //};
    //
    //var getLaunchCommand = function(gameId) {
    //    console.log('system.service::getLaunchCommand: ', gameId);
    //
    //    var deferred = Q.defer();
    //
    //    var success = function(game) {
    //        gameModel = game;
    //
    //        deferred.resolve();
    //    };
    //
    //    var error = function(error) {
    //        deferred.reject({error: 'error getting game launch command'});
    //    };
    //
    //    gameDao.getGameById(gameId)
    //        .then(success, error);
    //
    //    return deferred.promise;
    //};
    //
    //var killChildProcess = function() {
    //    console.log('system.service::killChildProcess');
    //
    //    var deferred = Q.defer();
    //
    //    if(childProcess)
    //        childProcess.kill();
    //
    //    deferred.resolve();
    //
    //    return deferred.promise;
    //};
    //
    //var executeLaunchCommand = function() {
    //    console.log('system.service::executeLaunchCommand:gameModel.launchCommand: ', gameModel.launchCommand);
    //
    //    var deferred = Q.defer();
    //
    //    childProcess = exec(gameModel.launchCommand, function(error, stdout, stderr) {
    //        console.log('exec::error: ', error);
    //        console.log('exec::stdout: ', stdout);
    //        console.log('exec::stderr: ', stderr);
    //    });
    //
    //    childProcess.disconnect()
    //
    //    homeActive = false;
    //
    //    deferred.resolve();
    //
    //    return deferred.promise;
    //};
    //
    //var suspendHome = function() {
    //    console.log('system.service::suspendHome');
    //
    //    var deferred = Q.defer();
    //
    //    var suspend = function() {
    //        if(config.suspendResume && homePid) {
    //            exec('kill -STOP ' + homePid, function (error, stdout, stderr) {
    //                console.log('!!! suspend homePid::error: ', error);
    //                console.log('!!! suspend homePid::stdout: ', stdout);
    //                console.log('!!! suspend homePid::stderr: ', stderr);
    //            });
    //        }
    //
    //        deferred.resolve();
    //    };
    //
    //    if(!homePid) {
    //       wmctrl.list(function(err, list) {
    //           //find homePid
    //           for (var window in list) {
    //               if (list[window].title.indexOf('gameboard-ui') > -1) {
    //                   homePid = list[window].pid;
    //                   break;
    //               }
    //           }
    //
    //           suspend();
    //       });
    //   } else {
    //        suspend();
    //    }
    //
    //    return deferred.promise;
    //};
    //
    //var resumeHome = function() {
    //    console.log('system.service::resumeHome');
    //
    //    var deferred = Q.defer();
    //
    //    if(config.suspendResume && homePid) {
    //        exec('kill -CONT ' + homePid, function (error, stdout, stderr) {
    //            console.log('!!! resume homePid::error: ', error);
    //            console.log('!!! resume homePid::stdout: ', stdout);
    //            console.log('!!! resume homePid::stderr: ', stderr);
    //        });
    //    }
    //
    //    deferred.resolve();
    //
    //    return deferred.promise;
    //};
    //
    //var suspendApp = function() {
    //    console.log('system.service::suspendApp');
    //
    //    var deferred = Q.defer();
    //
    //    if(config.suspendResume && childProcess.pid) {
    //        exec('kill -STOP ' + childProcess.pid, function (error, stdout, stderr) {
    //            console.log('!!! suspend childProcess.pid::error: ', error);
    //            console.log('!!! suspend childProcess.pid::stdout: ', stdout);
    //            console.log('!!! suspend childProcess.pid::stderr: ', stderr);
    //        });
    //    }
    //
    //    deferred.resolve();
    //
    //    return deferred.promise;
    //};
    //
    //var resumeApp = function() {
    //    console.log('system.service::resumeApp');
    //
    //    var deferred = Q.defer();
    //
    //    if(config.suspendResume && childProcess.pid) {
    //        exec('kill -CONT ' + childProcess.pid, function (error, stdout, stderr) {
    //            console.log('!!! resuem childProcess.pid::error: ', error);
    //            console.log('!!! resuem childProcess.pid::stdout: ', stdout);
    //            console.log('!!! resuem childProcess.pid::stderr: ', stderr);
    //        });
    //    }
    //
    //    deferred.resolve();
    //
    //    return deferred.promise;
    //};

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
            return deferred.promise;
        }

        //TODO: if switching to new app, display confirmation message to user
        //launching new app, kill current
        if(id != plyxalAppId) {
            resumePid(appPid);
            killPid(appPid);
        }

        var success = function(game) {
            plyxalAppId = game.id;

            var continueExecute = function() {
                var suc = function() {
                    console.log('execute game success');
                    deferred.resolve({message: 'execute game success'})
                };

                executeGame(game.launchCommand)
                    .then(suc, deferred.reject);
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

        var child = exec(launchCommand, function(error, stdout, stderr) {
            console.log('exec::error: ', error);
            console.log('exec::stdout: ', stdout);
            console.log('exec::stderr: ', stderr);
        });

        console.log('set appPid: ', child.pid+1);
        //add 1 to the pid because /bin/sh is the app running which launches what we want -psmithiv
        appPid = child.pid+1;

        //disconnect child process from node!
        //child.disconnect();

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
        if(config.suspendResume && pid)
            exec('kill -STOP ' + pid, function(error, stdout, stderr) {
                console.log('!!! kill -STOP::error: ', error);
                console.log('!!! kill -STOP::stdout: ', stdout);
                console.log('!!! kill -STOP::stderr: ', stderr);
            });
    };

    var resumePid = function(pid) {
        if(config.suspendResume && pid)
            exec('kill -CONT ' + pid, function(error, stdout, stderr) {
                console.log('!!! kill -CONT::error: ', error);
                console.log('!!! kill -CONT::stdout: ', stdout);
                console.log('!!! kill -CONT::stderr: ', stderr);
            });
    };

    var killPid = function(pid) {
        if(config.killApp && pid) {
            wmctrl.list(function(err, list) {
                //find pid
                for (var i in list) {
                    if (list[i].pid == pid) {
                        console.log('found window: ', list[i].id.toString(16));
                        var id = '0x0' + list[i].id.toString(16);
                        exec('wmctrl -ic ' + id, function(error, stdout, stderr) {
                            console.log('!!! kill::error: ', error);
                            console.log('!!! kill::stdout: ', stdout);
                            console.log('!!! kill::stderr: ', stderr);
                        });
                        break;
                    }
                }
            });
        }

        //wmctrl -c 0x04400009

        //if(config.killApp && pid) {
        //    exec('kill -15 ' + pid, function (error, stdout, stderr) {
        //        console.log('!!! kill::error: ', error);
        //        console.log('!!! kill::stdout: ', stdout);
        //        console.log('!!! kill::stderr: ', stderr);
        //    });
        //}
    };

    return {
        launch: launch,
        swapApplication: swapApplication
    }
}