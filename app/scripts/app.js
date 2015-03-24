'use strict';

angular
  .module('dashboard', [
    'ngAnimate', 'ngMessages', 'ngSanitize', 'astromo.metrics',
    'astromo.docs', 'ui.router', 'angular-jwt'
  ])
  .config(function ($stateProvider, $urlMatcherFactoryProvider, $locationProvider,
    jwtInterceptorProvider, $httpProvider, $urlRouterProvider) {

    /**
     * Configure locationProvider and urlMatcher
     */
    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false);

    /**
     * Configure jwt-token provider
     */
    jwtInterceptorProvider.tokenGetter = ['config', function(config) {

      // Don't send Authorization header on html template requests
      if (config.headers.Accept === 'text/html')
        return;

      return localStorage.getItem('astromo_token');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/');

    /**
     * Configure ui-router states
     */
    $stateProvider
      .state('login', {
        url         : '/login',
        templateUrl : 'views/login.html',
        controller  : 'dashboard.loginController'
      })
      .state('logout', {
        url         : '/logout',
        controller  : 'dashboard.logoutController'
      })
      .state('dashboard', {
        abstract    : true,
        templateUrl : 'views/dashboard.html',
        controller  : 'dashboard.mainController'
      })
      .state('dashboard.home', {
        url         : '',
        templateUrl : 'views/partials/_home.html',
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

  }).run(function($rootScope, auth, $state) {

    function locationChangeStartHandler(e) {
      // check authentication before every location change
      if (!auth.isAuthenticated()) {
        e.preventDefault();
        $state.go('login');
      }
    }

    $rootScope.$on('$locationChangeStart', locationChangeStartHandler);
  });
