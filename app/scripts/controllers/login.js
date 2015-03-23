'use strict';

angular.module('dashboard')
  .controller('dashboard.loginController', function($scope, auth, $state) {

    $scope.authenticate = function(user) {

      $scope.error = null;

      auth.authenticate(user, function(err, token) {

        if (err)
          $scope.error = err;
        else
          $state.go('dashboard.home');

      });
    };

    if (auth.isAuthenticated())
      $state.go('dashboard.home');

  });
