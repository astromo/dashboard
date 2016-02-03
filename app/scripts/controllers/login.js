'use strict'

angular.module('dashboard')
  .controller('dashboard.loginController', function ($scope, auth, $state) {
    $scope.authenticate = function (user) {
      user = user || {}

      $scope.error = null
      $scope.loading = true

      auth.authenticate(user, function (err, token) {
        $scope.loading = false

        if (err)
          $scope.error = err
        else
          $state.go('dashboard.home')

      })
    }

    if (auth.isAuthenticated())
      $state.go('dashboard.home')

  })
