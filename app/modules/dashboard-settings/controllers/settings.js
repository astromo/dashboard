'use strict'

angular.module('astromo.settings')
  .controller('settings.mainController', function ($scope, profile) {
    // default profile avatar
    profile.avatar = profile.avatar || 'images/avatar.png'

    $scope.profile = profile

    console.log('and settings')

    // initialize profile tabs
    $(document).foundation('tab', 'reflow')
  })
