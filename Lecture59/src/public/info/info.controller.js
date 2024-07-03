(function () {
  "use strict";

  angular.module('public')
    .controller('infoController', infoController);

  infoController.$inject = ['MenuService'];

  function infoController(MenuService) {
    var myInfoCtrl = this;
    myInfoCtrl.user = MenuService.getUser();
  }

})();
