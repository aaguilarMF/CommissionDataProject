var LandingPageController = function ($scope, $http, $route) {
    $scope.models = {
        nameLabel: 'Commission Data App',
        helloAngular: 'Commission Data'
    };
    $scope.navbarProperties = {
        isCollapsed: true
    };
    $scope.logout = function () {
        $http.get(
            '/Account/SignOut'
            ).then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
                $route.reload();

                /*if (response.data === "True") {
                    deferredObject.resolve({
                        success: true,
                        data: null
                    });
                } else {
                    deferredObject.resolve({
                        success: false,
                        message: response.data.Message
                    });
                }*/

            }//     response.data);
            , function (error) { //it never goes in here
                /*deferredObject.resolve({
                    success: false,
                    data: error.data
                })*/
            });
    }
}

// The $inject property of every controller (and pretty much every other type of object in Angular) needs to be a string array equal to the controllers arguments, only as strings
LandingPageController.$inject = ['$scope', '$http', '$route'];