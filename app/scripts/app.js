'use strict';

angular
  .module('dashboard', [
    'ngAnimate', 'ngMessages', 'ngSanitize', 'astromo.metrics',
    'astromo.config', 'astromo.docs', 'astromo.settings', 'ui.router',
    'angular-jwt', 'restangular'
  ])
  .config(function ($stateProvider, $urlMatcherFactoryProvider, $locationProvider,
    jwtInterceptorProvider, $httpProvider, $urlRouterProvider, RestangularProvider) {

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
     * Configure Restangular provider
     */
    RestangularProvider.setBaseUrl('http://127.0.0.1:3000/');
    RestangularProvider.setDefaultHttpFields({ cache: false });

    /**
     * Configure ui-router states
     */
    $stateProvider
      .state('login', {
        url         : '/login',
        templateUrl : 'views/login.html',
        controller  : 'dashboard.loginController'
      })
      .state('forgot-password', {
        url         : '/it-happens',
        templateUrl : 'views/forgot.html',
        controller  : 'dashboard.loginController'
      })
      .state('logout', {
        url         : '/logout',
        controller  : 'dashboard.logoutController'
      })
      .state('dashboard', {
        abstract    : true,
        templateUrl : 'views/dashboard.html',
        controller  : 'dashboard.mainController',
        data: { mustAuthenticate: true },
        resolve: {
          profile: function(Restangular) {
            return Restangular.one('users', 'me').get();
          }
        },
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
      })
      .state('dashboard.settings', {
        abstract    : true,
        url         : '/settings',
        templateUrl : 'modules/dashboard-settings/views/index.html',
        controller  : 'settings.mainController',
      })
      .state('dashboard.settings.profile', {
        url         : '/profile',
        templateUrl : 'modules/dashboard-settings/views/profile.html'
      })
      .state('dashboard.settings.billing', {
        url         : '/billing',
        templateUrl : 'modules/dashboard-settings/views/billing.html',
        controller  : 'settings.billingController',
        resolve     : {
          invoices: function(Restangular) {
            return Restangular.one('users', 'me').getList('invoices');
          }
        }
      });

  }).run(function($rootScope, auth, $state) {

    function locationChangeStartHandler(e, to) {

      var data = to.data || {};

      // check authentication before every location change
      if (data.mustAuthenticate && !auth.isAuthenticated()) {
        e.preventDefault();
        $state.go('login');
      }
    }

    $rootScope.$on('$stateChangeStart', locationChangeStartHandler);
  });
