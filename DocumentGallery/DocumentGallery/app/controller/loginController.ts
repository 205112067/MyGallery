module DocumentGallery.Controller {

    class LoginController {
       
        static $inject = ['$state','$scope', '$location', '$rootScope', '$localStorage', '$sessionStorage'];
        constructor(
           private $state:any,
            private $scope: ng.IScope,
            private $location: any,
            private $rootScope: ng.IRootScopeService,
            private $localStorage: any,
            private $sessionStorage: any
        ) {
           
        }

        public loginUser() {
            var vm = this;
            if (vm.$scope["login"].username == 'admin' && vm.$scope["login"].password == 'admin') {
                vm.$localStorage["isUserLoggedIn"] = true;
                vm.$localStorage["userName"] = vm.$scope["login"].username;
                
               
                vm.$location.path('/home/0');
            }
            else {
                alert('wrong credential..try agin!!');
            }
        }
        public logout() {
            debugger;
            var vm = this;
            vm.$rootScope["showLogout"] = false;
            vm.$localStorage["isUserLoggedIn"] = false;
            //vm.$location.path('/login');
            vm.$state.go('login');
        }
    }
    angular.module('app').controller('LoginController', LoginController);
}