var CommissionDataApp = angular.module('CommissionDataApp', ['ngRoute', 'ui.grid', 'ngAnimate', 'ui.grid.edit', 'ui.bootstrap', 'ui.grid.selection']);


//Controllers
CommissionDataApp.controller('LandingPageController', LandingPageController);
CommissionDataApp.controller('SearchController', SearchController);
CommissionDataApp.controller('CommissionDataController', CommissionDataController);

//Services
CommissionDataApp.service('SearchServices', SearchServices);

//Factories
CommissionDataApp.factory('CommissionRepresentativeFactory', CommissionRepresentativeFactory);
CommissionDataApp.factory('CommissionFactory', CommissionFactory);

//Directives
CommissionDataApp.directive('modalDialog', ModalDialogDirective);
CommissionDataApp.directive('ngConfirmClick', ConfirmClickDirective);

var configFunction = function ($routeProvider) {

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
            templateUrl: '/Account/Login'
        })
        .when('/register', {
            templateUrl: '/Account/Register'
        })
        .when('/washCoatDataView', {
            templateUrl: '/WashCoat/Index'
        });

    //$httpProvider.interceptors.push('AuthHttpResponseInterceptor');
}
configFunction.$inject = ['$routeProvider' ];
CommissionDataApp.config(configFunction);