'use strict';

angular
  .module('dashboard', ['ngAnimate', 'ngMessages', 'ngRoute', 'ngSanitize', 'astromo.metrics',
  'ui.router' ])
  .constant('metricsPath', './vendor/astromo-dashboard-metrics')
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('dashboard', {
        abstract    : true,
        views       : {
          'sidenav' : {
            templateUrl : 'partials/_sidenav.html'
          },
          'main' : {
            template : '<div ui-view></div>'
          }
        },
        controller  : 'dashboard.mainController'
      })
      .state('dashboard.home', {
        url         : '',
        templateUrl : 'views/home.html',
        controller  : 'dashboard.homeController'
      });

  });
