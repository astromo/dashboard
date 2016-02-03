'use strict'

angular.module('dashboard')
  .controller('dashboard.homeController', function ($scope, metrics, blueprints) {
    $scope.blueprints = blueprints || []
    $scope.metrics = metrics

    console.log('home sweet home')
  })
