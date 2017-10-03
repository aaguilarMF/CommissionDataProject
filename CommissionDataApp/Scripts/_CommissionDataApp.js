var CommissionDataApp = angular.module('CommissionDataApp', ['ngRoute', 'ui.grid',  'ui.grid.edit', 'ui.bootstrap', 'ui.grid.selection']);


//Controllers
CommissionDataApp.controller('LandingPageController', LandingPageController);
CommissionDataApp.controller('SearchController', SearchController);
CommissionDataApp.controller('CommissionDataController', CommissionDataController);
CommissionDataApp.controller('LoginController', LoginController);
CommissionDataApp.controller('RegisterController', RegisterController);

//Services
CommissionDataApp.service('SearchServices', SearchServices);

//Factories
CommissionDataApp.factory('CommissionRepresentativeFactory', CommissionRepresentativeFactory);
CommissionDataApp.factory('CommissionFactory', CommissionFactory);
CommissionDataApp.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
CommissionDataApp.factory('LoginFactory', LoginFactory);
CommissionDataApp.factory('RegistrationFactory', RegistrationFactory);

//Directives
CommissionDataApp.directive('modalDialog', ModalDialogDirective);
CommissionDataApp.directive('ngConfirmClick', ConfirmClickDirective);

var configFunction = function ($routeProvider, $httpProvider) {

    $routeProvider.
        when('/searchCustomerNo', {
            templateUrl: '/Commission/SearchByCustomerNo',
            controller: SearchController
        })
        .when('/viewAllData', {
            templateUrl: '/Commission/ViewAllData',
            controller: CommissionDataController
        })
        .when('/routeThree', {
            templateUrl: 'routesDemo/three'
        })
        .when('/login', {
            templateUrl: '/Account/Login',
            controller: LoginController
        })
        .when('/register', {
            templateUrl: '/Account/Register'
        })
        .when('/signOut', {
            templateUrl: '/Account/SignOut'
        })
        .when('/washCoatDataView', {
            templateUrl: '/WashCoat/Index'
        })
        .when('/login?returnUrl', {
        templateUrl: 'Account/Login',
        controller: LoginController
        })
        .when('/register', {
            templateUrl: '/Account/Register',
            controller: RegisterController
        });

    $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
}
configFunction.$inject = ['$routeProvider', '$httpProvider' ];
CommissionDataApp.config(configFunction);