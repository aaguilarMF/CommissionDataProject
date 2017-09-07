var RegisterController = function ($scope, $location, RegistrationFactoryRef) {
    $scope.registerForm = {
        emailAddress: '',
        password: '',
        confirmPassword: '',
        registrationFailure: false
    };

    $scope.register = function () {
        var result = RegistrationFactoryRef($scope.registerForm.emailAddress, $scope.registerForm.password, $scope.registerForm.confirmPassword);
        result.then(function (result) {
            if (result.success) {
                $location.path('/searchCustomerNo');
            } else {
                $scope.registerForm.registrationFailure = true;
            }
        });
    };
}

RegisterController.$inject = ['$scope', '$location', 'RegistrationFactory'];