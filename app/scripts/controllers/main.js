'use strict'

angular.module('dashboard')
  .controller('dashboard.mainController', function ($scope, profile) {
    console.log('dashboard')

    $scope.profile = profile

  })
