var DocumentGallery;
(function (DocumentGallery) {
    var Controller;
    (function (Controller) {
        var LoginController = (function () {
            function LoginController($state, $scope, $location, $rootScope, $localStorage, $sessionStorage) {
                this.$state = $state;
                this.$scope = $scope;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.$localStorage = $localStorage;
                this.$sessionStorage = $sessionStorage;
            }
            LoginController.prototype.loginUser = function () {
                var vm = this;
                if (vm.$scope["login"].username == 'admin' && vm.$scope["login"].password == 'admin') {
                    vm.$localStorage["isUserLoggedIn"] = true;
                    vm.$localStorage["userName"] = vm.$scope["login"].username;
                    vm.$location.path('/home/0');
                }
                else {
                    alert('wrong credential..try agin!!');
                }
            };
            LoginController.prototype.logout = function () {
                debugger;
                var vm = this;
                vm.$rootScope["showLogout"] = false;
                vm.$localStorage["isUserLoggedIn"] = false;
                //vm.$location.path('/login');
                vm.$state.go('login');
            };
            LoginController.$inject = ['$state', '$scope', '$location', '$rootScope', '$localStorage', '$sessionStorage'];
            return LoginController;
        }());
        angular.module('app').controller('LoginController', LoginController);
    })(Controller = DocumentGallery.Controller || (DocumentGallery.Controller = {}));
})(DocumentGallery || (DocumentGallery = {}));
//# sourceMappingURL=loginController.js.map