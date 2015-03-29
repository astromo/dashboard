'use strict';

angular.module('dashboard')
  .controller('dashboard.navController', function($scope, $state) {

    $scope.state = $state;

    $scope.expand = function() {
      $(document).foundation('dropdown', 'reflow');
    };

  });
