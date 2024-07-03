// signup.controller.js
(function () {
  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService','$scope'];

  function SignUpController(MenuService, $scope) {
    var signupCtrl = this;

    signupCtrl.user = {};
    signupCtrl.message = "";

    signupCtrl.submitForm = function (isValid) {
      if (isValid) {
        var favoriteItemUrl = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${signupCtrl.user.favoriteMenuCategory}/menu_items/${signupCtrl.user.favoriteMenuNumber}.json`;
        
        MenuService.getMenuItem(favoriteItemUrl).then(function (response) {
          if (response === null) {
            signupCtrl.message = "No such menu number exists.";
          } else {
            MenuService.saveUser(signupCtrl.user, response);
            signupCtrl.message = "Your information has been saved.";
          }
        });
      }
    };
  }
})();
