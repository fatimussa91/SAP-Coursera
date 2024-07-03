(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;
    var user = null; // Define a variable to store user data

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
        return response.data;
      });
    };

    service.getAllMenuItems = function () {
      return $http.get(ApiPath + '/menu_items.json').then(function (response) {
        return response.data;
      });
    };
    service.getMenuItem = function (category, itemNumber) {
      return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + itemNumber +'.json' ).then(function (response) {
        return response.data;
      });
    }; 

    service.saveUser = function (userData, menuItem) {
      user = {
        ...userData,
        favoriteItem: menuItem
      };
    };

    service.getUser = function () {
      return user;
    };

  }
})();
