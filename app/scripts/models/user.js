'use strict';

angular.module('dashboard')
  .factory('User', function($resource) {
    return $resource('http://127.0.0.1:3000/users/me');
  });
