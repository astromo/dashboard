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
        templateUrl : 'views/main.html',
        controller  : 'dashboard.mainController'
      })
      .state('dashboard.home', {
        url         : '',
        templateUrl : 'views/home.html',
        controller  : 'dashboard.homeController'
      });

  });
