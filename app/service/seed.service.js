/**
 * Created by Paul on 8/18/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var gameDao = inject('gameDao');

    var seedGames = function() {

        var createSkylanders = function() {
            return gameDao.seedGame({
                route: '/skylanders',
                templateUrl: 'games/skylanders/partials/view/skylanders.html',
                controller: 'skylandersController',
                controllerUrl: 'games/skylanders/js/controller/skylanders.controller',
                title: 'Skylanders',
                logoUrl: 'games/skylanders/assets/images/logo.png',
                css: 'games/skylanders/assets/css/skylanders.css',
                launchCommand: 'pcmanfm'
            });
        };

        var createMonopoly = function() {
            return gameDao.seedGame({
                route: '/monopolyplus',
                templateUrl: 'games/monopolyplus/partials/view/monopoly.plus.html',
                controller: 'monopolyPlusController',
                controllerUrl: 'games/monopolyplus/js/controller/monopoly.plus.controller',
                title: 'Monopoly Plus',
                logoUrl: 'games/monopolyplus/assets/images/logo.png',
                css: 'games/monopolyplus/assets/css/monopoly.plus.css',
                launchCommand: 'lxterminal'
            });
        };

        var createScrabble = function() {
            return gameDao.seedGame({
                route: '/scrabble',
                templateUrl: 'games/scrabble/partials/view/scrabble.html',
                controller: 'scrabbleController',
                controllerUrl: 'games/scrabble/js/controller/scrabble.controller',
                title: 'Scrabble',
                logoUrl: 'games/scrabble/assets/images/logo.png',
                css: 'games/scrabble/assets/css/scrabble.css',
                launchCommand: ''
            });
        };

        var createLauraGo = function() {
            return gameDao.seedGame({
                route: '/larago',
                templateUrl: 'games/larago/partials/view/lara.go.html',
                controller: 'laraGoController',
                controllerUrl: 'games/larago/js/controller/lara.go.controller',
                title: 'Laura Craft Go',
                logoUrl: 'games/larago/assets/images/logo.png',
                css: 'games/larago/assets/css/lara.go.css',
                launchCommand: ''
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

        return gameDao.destroyAll()
            .then(createSkylanders)
            .then(createMonopoly)
            .then(createScrabble)
            .then(createLauraGo)
            .then(createPong)
    };

    (function() {
        if(config.seedGames)
            seedGames();
    }())
}