/**
 * Created by Paul on 8/18/2015.
 */
module = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var gameDao = inject('gameDao');

    var seedGames = function() {
        gameDao.destroyAll()
            .then(function() {
                gameDao.seedGame({
                    route: '/monopolyplus',
                    templateUrl: 'games/monopolyplus/partials/view/monopolyplus.html',
                    controller: 'monopolyplusController',
                    controllerUrl: 'games/monopolyplus/js/controller/monopolyplus.controller',
                    title: 'Monopoly Plus',
                    logoUrl: 'games/monopolyplus/assets/images/monopolyplus.logo.mid.png',
                    css: 'games/monopolyplus/assets/css/monopolyplus.css',
                    launchCommand: 'chromium-browser --user-data-dir=chrome-data --incognito --window-size=1920,1080 --app="http://www.plyxal.com"'
                });

                gameDao.seedGame({
                    route: '/battle',
                    templateUrl: 'games/battle/partials/view/battle.html',
                    controller: 'battleController',
                    controllerUrl: 'games/battle/js/controller/battle.controller',
                    title: 'Battle',
                    logoUrl: '',
                    css: 'games/battle/assets/css/battle.css',
                    launchCommand: ''
                });

                gameDao.seedGame({
                    route: '/candyland',
                    templateUrl: 'games/candyland/partials/view/candyland.html',
                    controller: 'candylandController',
                    controllerUrl: 'games/candyland/js/controller/candyland.controller',
                    title: 'Candy Land',
                    logoUrl: 'games/candyland/assets/images/candyland.logo.mid.3.png',
                    css: '',
                    launchCommand: ''
                });

                gameDao.seedGame({
                    route: '/scrabble',
                    templateUrl: 'games/scrabble/partials/view/scrabble.html',
                    controller: 'scrabbleController',
                    controllerUrl: 'games/scrabble/js/controller/scrabble.controller',
                    title: 'Scrabble',
                    logoUrl: 'games/scrabble/assets/images/scrabble.logo.mid.3.png',
                    css: '',
                    launchCommand: ''
                });

                gameDao.seedGame({
                    route: '/skylanders',
                    templateUrl: 'games/skylanders/partials/view/skylanders.html',
                    controller: 'skylandersController',
                    controllerUrl: 'games/skylanders/js/controller/skylanders.controller',
                    title: 'Skylanders',
                    logoUrl: 'games/skylanders/assets/images/skylanders.logo.mid.png',
                    css: '',
                    launchCommand: ''
                });
            });
    };

    (function() {
        if(config.seedGames)
            seedGames();
    }())
}