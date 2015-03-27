'use strict';

angular.module('astromo.profile')
  .controller('profile.mainController', function($scope, profile) {

    $scope.profile = profile;

    console.log('and profile');
  });

