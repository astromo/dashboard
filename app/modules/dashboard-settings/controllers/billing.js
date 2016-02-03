'use strict'

angular.module('astromo.settings')
  .controller('settings.billingController', function ($scope, invoices) {
    $scope.invoices = invoices

    console.log('and billing')
  })
