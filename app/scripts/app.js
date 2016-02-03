'use strict'

angular
  .module('dashboard', [
    'ngAnimate', 'ngMessages', 'ngSanitize', 'astromo.metrics',
    'astromo.config', 'astromo.docs', 'astromo.settings', 'ui.router',
    'angular-jwt', 'restangular'
  ])
  .config(function ($stateProvider, $urlMatcherFactoryProvider, $locationProvider,
    jwtInterceptorProvider, $httpProvider, $urlRouterProvider, RestangularProvider,
    apiBaseUrl) {
    /**
     * Configure locationProvider and urlMatcher
     */
    $locationProvider.html5Mode(true)
    $urlMatcherFactoryProvider.strictMode(false)

    /**
     * Configure jwt-token provider
     */
    jwtInterceptorProvider.tokenGetter = ['config', function (config) {
      // Don't send Authorization header on html template requests
      if (config.headers.Accept === 'text/html')
        return

      return localStorage.getItem('astromo_token')
    }]
    $httpProvider.interceptors.push('jwtInterceptor')

    $urlRouterProvider.otherwise('/')

    /**
     * Configure Restangular provider
     */
    RestangularProvider.setBaseUrl(apiBaseUrl)
    RestangularProvider.setDefaultHttpFields({ cache: false })

    /**
     * Configure ui-router states
     */
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'dashboard.loginController'
      })
      .state('forgot-password', {
        url: '/it-happens',
        templateUrl: 'views/forgot.html',
        controller: 'dashboard.loginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'dashboard.logoutController'
      })
      .state('dashboard', {
        abstract: true,
        templateUrl: 'views/dashboard.html',
        controller: 'dashboard.mainController',
        data: { mustAuthenticate: true },
        resolve: {
          profile: function (Restangular) {
            return Restangular.one('users', 'me').get()
          }
        },
      })
      .state('dashboard.home', {
        url: '',
        templateUrl: 'views/partials/_home.html',
        controller: 'dashboard.homeController',
        resolve: {
          metrics: function (Restangular) {
            return Restangular.all('metrics').all('overview').getList()
          },
          blueprints: function (Restangular) {
            return Restangular.one('users', 'me').getList('blueprints',
              { fields: 'name,slug' })
          }
        }
      })
      .state('dashboard.metrics', {
        url: '/metrics',
        templateUrl: 'modules/dashboard-metrics/views/index.html',
        controller: 'metrics.mainController'
      })
      .state('dashboard.docs', {
        url: '/documentation',
        templateUrl: 'modules/dashboard-documentation/views/index.html',
        controller: 'docs.mainController',
        resolve: {
          blueprints: function (Restangular) {
            return Restangular.one('users', 'me').getList('blueprints')
          }
        },
        onEnter: function ($timeout, blueprints, $state) {
          if (blueprints.length > 0) {
            $timeout(function () {
              var lastActive
              var slug = $state.params.blueprint || lastActive || blueprints[0].slug
              $state.go('dashboard.docs.blueprint', { blueprint: slug })
            })
          }
        }
      })
      .state('dashboard.docs.blueprint', {
        url: '/:blueprint',
        templateUrl: 'modules/dashboard-documentation/views/blueprint.html',
        controller: 'docs.blueprintController'
      })
      .state('dashboard.settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/dashboard-settings/views/index.html',
        controller: 'settings.mainController',
      })
      .state('dashboard.settings.profile', {
        url: '/profile',
        templateUrl: 'modules/dashboard-settings/views/profile.html'
      })
      .state('dashboard.settings.billing', {
        url: '/billing',
        templateUrl: 'modules/dashboard-settings/views/billing.html',
        controller: 'settings.billingController',
        resolve: {
          invoices: function (Restangular) {
            return Restangular.one('users', 'me').getList('invoices')
          }
        }
      })

  }).run(function ($rootScope, auth, $state) {
  function locationChangeStartHandler (e, to) {
    var data = to.data || {}

    // check authentication before every location change
    if (data.mustAuthenticate && !auth.isAuthenticated()) {
      e.preventDefault()
      $state.go('login')
    }
  }

  $rootScope.$on('$stateChangeStart', locationChangeStartHandler)
})
