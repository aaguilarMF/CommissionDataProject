var CommissionDataApp = angular.module('CommissionDataApp', ['ngRoute']);

//Controllers
CommissionDataApp.controller('LandingPageController', LandingPageController);
CommissionDataApp.controller('SearchController', SearchController);

//Services
CommissionDataApp.service('SearchServices', SearchServices);

var configFunction = function ($routeProvider) {

    $routeProvider.
        when('/searchCustomerNo', {
            templateUrl: '/Commission/SearchByCustomerNo',
            controller: SearchController
        })
        .when('/routeTwo/:donuts', {
            templateUrl: function (params) { return '/routesDemo/two?donuts=' + params.donuts; }
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