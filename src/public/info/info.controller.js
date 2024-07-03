(function () {
  "use strict";

  angular.module('public')
    .controller('infoController', infoController);

  infoController.$inject = ['MenuService'];

  function infoController(MenuService) {
    var infoCtrl = this;
    infoCtrl.user = MenuService.getUser();
  }

})();
