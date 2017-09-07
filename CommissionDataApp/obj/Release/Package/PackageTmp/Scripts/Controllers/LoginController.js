var LoginController = function ($scope, $routeParams, $location, LoginFactoryRef) {
    $scope.loginForm = {
        emailAddress: '',
        password: '',
        rememberMe: false,
        returnUrl: $routeParams.returnUrl,
        loginFailure: false
    };

    $scope.login = function () {
        var result = LoginFactoryRef($scope.loginForm.emailAddress, $scope.loginForm.password, $scope.loginForm.rememberMe);
        result.then(function (result) {
            if (result.success) {
                if ($scope.loginForm.returnUrl !== undefined) {
                    $location.path('/searchCustomerNo');
                } else {
                    $location.path($scope.loginForm.returnUrl);
                }
            } else {
                $scope.loginForm.loginFailure = true;
            }
        });
    };
}

LoginController.$inject = ['$scope', '$routeParams', '$location', 'LoginFactory'];