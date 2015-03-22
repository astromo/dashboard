'use strict';

angular
  .module('dashboard', [
    'ngAnimate', 'ngMessages', 'ngRoute', 'ngSanitize', 'astromo.metrics',
    'astromo.docs', 'ui.router', 'angular-jwt'
  ])
  .config(function ($stateProvider, $urlMatcherFactoryProvider, $locationProvider,
    jwtInterceptorProvider, $httpProvider) {

    /**
     * Configure locationProvider and urlMatcher
     */
    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);

    /**
     * Configure jwt-token provider
     */
    jwtInterceptorProvider.tokenGetter = function(config) {

      // Don't send Authorization header on html template requests
      if (config.headers.Accept === 'text/html')
        return;

      return localStorage.getItem('astromo_token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');

    /**
     * Configure ui-router states
     */
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
      })
      .state('dashboard.metrics', {
        url         : '/metrics',
        templateUrl : 'modules/dashboard-metrics/views/index.html',
        controller  : 'metrics.mainController'
      })
      .state('dashboard.docs', {
        url         : '/documentation',
        templateUrl : 'modules/dashboard-documentation/views/index.html',
        controller  : 'docs.mainController'
      });

  });
