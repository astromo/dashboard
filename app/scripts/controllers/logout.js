'use strict';

angular.module('dashboard')
  .controller('dashboard.logoutController', function($state) {
    localStorage.removeItem('astromo_token');
    $state.go('login');
  });
