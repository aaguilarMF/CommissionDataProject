var LoginFactory = function ($http, $q) {
    return function (emailAddress, password, rememberMe) {
        var deferredObject = $q.defer();

        $http.post(
            '/Account/Login', {
                UserName: emailAddress,
                Password: password,
                RememberMe: rememberMe
            }
            ).then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
                if (response.data === "True") {
                    deferredObject.resolve({
                        success: true,
                        data: null
                    });
                } else {
                    deferredObject.resolve({
                        success: false,
                        message: response.data.Message
                    });
                }

            }//     response.data);
            , function (error) { //it never goes in here
                deferredObject.resolve({
                    success: false,
                    data: error.data
                })
            });
       /* .success(function (data) {
            if (data == 'true') {
                deferredObject.resolve({ success: true });
            } else {
                deferredObject.resolve({ success: false });
            }
        }).
        error(function () {
            deferredObject.resolve({ success: false });
        });*/

        return deferredObject.promise;
    }
}

LoginFactory.$inject = ['$http', '$q'];