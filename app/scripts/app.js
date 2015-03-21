'use strict';

angular
  .module('dashboard', [
    'ngAnimate', 'ngMessages', 'ngRoute', 'ngSanitize', 'astromo.metrics',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlMatcherFactoryProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('dashboard', {
        abstract    : true,
        views       : {
          'sidenav' : {
            templateUrl : 'views/partials/_sidenav.html'
          },
          'main' : {
            template   : '<div ui-view></div>',
            controller : 'dashboard.mainController'
          }
        }
      })
      .state('dashboard.home', {
        url         : '',
        templateUrl : 'views/home.html',
        controller  : 'dashboard.homeController'
      });

  });
