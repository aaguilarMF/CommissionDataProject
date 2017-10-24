var LoginController = function ($scope, $routeParams, $location, LoginFactoryRef, $window) {
    $scope.loginForm = {
        emailAddress: '',
        password: '',
        rememberMe: false,
        returnUrl: $routeParams.returnUrl,
        errorLoggingIn: false,
        errorPrompt: null
    };

    $scope.login = function () {
        var result = LoginFactoryRef($scope.loginForm.emailAddress, $scope.loginForm.password, $scope.loginForm.rememberMe);
        result.then(
            function (data) {
                $window.location.reload();
            },
            function (error) {
                $scope.loginForm.errorPrompt = error.statusText;
                $scope.loginForm.errorLogginIn = true; //whether it's an entire new document html markup or just a string, we display error.
            }
            );
    };
}

LoginController.$inject = ['$scope', '$routeParams', '$location', 'LoginFactory', '$window'];