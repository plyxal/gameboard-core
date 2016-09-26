/**
 * Created by Paul on 8/18/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var gameDao = inject('gameDao');

    var seedGames = function() {
        var createMonopoly = function() {
            return gameDao.seedGame({
                route: '/monopolyplus',
                templateUrl: 'games/monopolyplus/partials/view/monopolyplus.html',
                controller: 'monopolyplusController',
                controllerUrl: 'games/monopolyplus/js/controller/monopolyplus.controller',
                title: 'Monopoly Plus',
                logoUrl: 'games/monopolyplus/assets/images/monopolyplus.logo.mid.png',
                css: 'games/monopolyplus/assets/css/monopolyplus.css',
                launchCommand: 'lxterminal'
            });
        };

        var createBattle = function() {
            return gameDao.seedGame({
                route: '/battle',
                templateUrl: 'games/battle/partials/view/battle.html',
                controller: 'battleController',
                controllerUrl: 'games/battle/js/controller/battle.controller',
                title: 'Battle',
                logoUrl: '',
                css: 'games/battle/assets/css/battle.css',
                launchCommand: ''
            });
        };

        var createLauraGo = function() {
            return gameDao.seedGame({
                route: '/laurago',
                templateUrl: 'games/laurago/partials/view/laurago.html',
                controller: 'lauragoController',
                controllerUrl: 'games/laurago/js/controller/laurago.controller',
                title: 'Laura Craft Go',
                logoUrl: 'games/laurago/assets/images/logo.png',
                css: '',
                launchCommand: ''
            });
        };

        var createScrabble = function() {
            return gameDao.seedGame({
                route: '/scrabble',
                templateUrl: 'games/scrabble/partials/view/scrabble.html',
                controller: 'scrabbleController',
                controllerUrl: 'games/scrabble/js/controller/scrabble.controller',
                title: 'Scrabble',
                logoUrl: 'games/scrabble/assets/images/scrabble.logo.mid.3.png',
                css: '',
                launchCommand: ''
            });
        };


        var createSkylanders = function() {
            return gameDao.seedGame({
                route: '/skylanders',
                templateUrl: 'games/skylanders/partials/view/skylanders.html',
                controller: 'skylandersController',
                controllerUrl: 'games/skylanders/js/controller/skylanders.controller',
                title: 'Skylanders',
                logoUrl: 'games/skylanders/assets/images/skylanders.logo.mid.png',
                css: 'games/skylanders/assets/css/skylanders.css',
                launchCommand: 'pcmanfm'
            });
        };

        var createPong = function() {
            return gameDao.seedGame({
                route: '/pong',
                templateUrl: 'games/pong/partials/view/pong.html',
                controller: 'pongController',
                controllerUrl: 'games/pong/js/controller/pong.controller',
                title: 'Pong',
                logoUrl: 'games/pong/assets/images/logo.png',
                css: 'games/pong/assets/css/pong.css',
                launchCommand: '/home/gameboard/Documents/Pong/pong.x86_64'
            });
        };

        //'chromium-browser --user-data-dir=chrome-data --password-store=basic --incognito --window-size=1920,1080 --app="http://www.google.com"'

        return gameDao.destroyAll()
            .then(createSkylanders)
            .then(createMonopoly)
            .then(createScrabble)
            .then(createLauraGo)
            .then(createPong)
            .then(createBattle)
    };

    (function() {
        if(config.seedGames)
            seedGames();
    }())
}