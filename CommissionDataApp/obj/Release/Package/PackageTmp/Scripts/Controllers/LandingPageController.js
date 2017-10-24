var LandingPageController = function ($scope, $http, $route, $window) {
    $scope.models = {
        nameLabel: 'Commission Data App',
        helloAngular: 'Commission Data',
        active: false
    };
    $scope.navbarProperties = {
        isCollapsed: true
    };
    $scope.logOff = function () {
        $http.post(
            '/Account/LogOff'
            ).then(
            function (response) {
                $window.location.reload();
            },
            function (error) {
                alert('Error logging out. Contact IT. But you can also clear your cookies. Go to settings in browser and clear cookies. But Also do contact IT please.')
            });
    }
    $scope.homeView = function () {
        $scope.models.active = true;
    }
}

// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
LandingPageController.$inject = ['$scope', '$http', '$route', '$window'];