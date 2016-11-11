module DocumentGallery {
    angular.module('app', ['ngMaterial', 'ngAnimate', 'material.svgAssetsCache', 'md.data.table', 'ngMdIcons', 'ngMessages', 'ui.router', 'lfNgMdFileInput','ngStorage']);
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("home",
            {
                url: '/home/{parent_Id}',
                controller: "DocumentFolderController",
                templateUrl: "app/template/home.html",
                controllerAs: "documentFolderController",
                resolve: {
                    isLoggedIn: function ($localStorage) {
                        if ($localStorage.isUserLoggedIn) {
                            return true;
                        }
                        else {
                            false;
                        }
                    }
                }
            }),
            $stateProvider.state("login",
                {
                    url: '/login',
                    templateUrl: "app/template/login.html",
                    controller: "LoginController",
                    controllerAs: "loginCtrl"     
                })
    });
    angular.module('app').run(function ($rootScope, $location,$state,$localStorage) {
        debugger;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if ($localStorage.isUserLoggedIn) {
               
            }
            else {
                $location.path('/login');
            }
        })
    });
    angular.module('app').config(function ($mdThemingProvider) {
        $mdThemingProvider.theme("success-toast"); $mdThemingProvider.theme("error-toast");
    });
    angular.module('app').filter('bytes', function () {
        return function (bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (typeof precision === 'undefined') precision = 1;
            var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        }
    });
    angular.module("app").directive('focusOn', function () {
        return function (scope, elem, attr) {
            scope.$on('focusOn', function (e, name) {
                if (name === attr.focusOn) {
                    elem[0].focus();
                }
            });
        };
    });
    angular.module("app").factory('focus', function ($rootScope, $timeout) {
        return function (name) {
            $timeout(function () {
                $rootScope.$broadcast('focusOn', name);
            });
        }
    });
    angular.module('app').constant('BaseUrl','http://localhost:50255/api/');
}