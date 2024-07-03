// src/signup/signup.controller.js
(function () {
  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService'];

  function SignUpController(MenuService) {
    var signupCtrl = this;

    signupCtrl.user = {};
    signupCtrl.message = "";

    signupCtrl.submitForm = function (isValid) {
      if (isValid) {
        if (signupCtrl.user.favoriteMenuCategory && signupCtrl.user.favoriteMenuNumber) {
          var category = signupCtrl.user.favoriteMenuCategory;
          var itemNumber = signupCtrl.user.favoriteMenuNumber;

          // Correct URL construction
          MenuService.getMenuItem(category, itemNumber).then(function (response) {
            if (response === null) {
              signupCtrl.message = "No such menu number exists.";
            } else {
              MenuService.saveUser(signupCtrl.user, response);
              signupCtrl.message = "Your information has been saved.";
            }
          });
        } else {
          MenuService.saveUser(signupCtrl.user, null);
          signupCtrl.message = "Your information has been saved.";
        }
      }
    };
  }
})();
