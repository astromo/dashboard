'use strict';

angular.module('dashboard')
  .controller('dashboard.homeController', function($scope, metrics) {

    $scope.metrics = metrics;

    console.log('home sweet home');
  });
