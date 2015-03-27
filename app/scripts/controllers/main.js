'use strict';

angular.module('dashboard')
  .controller('dashboard.mainController', function ($scope, $state, profile, $timeout) {
    console.log('dashboard');

    $scope.state   = $state;
    $scope.profile = profile;

    // TODO: maybe move this to a separate sidenav controller?
    $scope.expandProfile = function() {
      $(document).foundation('dropdown', 'reflow');
    };

  });
