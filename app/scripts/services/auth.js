'use strict';

angular.module('dashboard')
  .service('auth', function ($http) {

    var self = this;

    this.apiUrl = 'http://localhost:3000';

    this.isAuthenticated = function() {
      return !!localStorage.getItem('astromo_token');
    };

    this.authenticate = function(user, callback) {

      $http.post(self.apiUrl + '/login', {
        username: user.username,
        password: user.password,
      })
      .success(function(res) {
        localStorage.setItem('astromo_token', res.token);
        callback(null, res.token);
      })
      .error(function(err) {
        err = err || new Error('Sorry, something went wrong');
        console.log(err);
        callback(err);
      });
    };

    this.logout = function() {
      localStorage.removeItem('astromo_token');
    };

  });
