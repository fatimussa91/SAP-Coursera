// src/signup/signup.controller.js
(function () {
  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', '$state'];

  function SignUpController(MenuService, $state) {
    var signupCtrl = this;
    window.myDebugContext = signupCtrl
    signupCtrl.user = {};
    signupCtrl.message = "";
    signupCtrl.menuItems = [];

    // Fake data for categories and menu items
    /*signupCtrl.menuItems = {
      "Appetizers": [
        { "short_name": "A1", "name": "Spring Rolls", "description": "Crispy rolls with vegetables", "image": "path/to/spring_rolls.jpg" },
        { "short_name": "A2", "name": "Dumplings", "description": "Steamed dumplings with pork", "image": "path/to/dumplings.jpg" }
      ],
      "Main Course": [
        { "short_name": "M1", "name": "Beef Steak", "description": "Grilled steak with sauce", "image": "path/to/beef_steak.jpg" },
        { "short_name": "M2", "name": "Chicken Curry", "description": "Spicy chicken curry", "image": "path/to/chicken_curry.jpg" }
      ],
      "Desserts": [
        { "short_name": "D1", "name": "Cheesecake", "description": "Creamy cheesecake", "image": "path/to/cheesecake.jpg" },
        { "short_name": "D2", "name": "Brownie", "description": "Chocolate brownie with ice cream", "image": "path/to/brownie.jpg" }
      ]
    };*/
   MenuService.getCategories().then(function (response) {
      signupCtrl.menuItems = response;
    });

    console.log(this.menuItems);

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
              $state.go('public.info'); // Navigate to public.info
            }
          });
        } else {
          MenuService.saveUser(signupCtrl.user, null);
          signupCtrl.message = "Your information has been saved.";
          $state.go('public.info'); // Navigate to public.info
        }
      }
    };
  }
})();
