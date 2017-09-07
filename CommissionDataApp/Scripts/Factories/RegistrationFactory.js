var RegistrationFactory = function ($http, $q) {
	return function (emailAddress, password, confirmPassword) {

		var deferredObject = $q.defer();

		$http.post(
            '/Account/Register', {
            	Email: emailAddress,
            	Password: password,
            	ConfirmPassword: confirmPassword
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
        /*
        success(function (data) {
        	if (data == "True") {
        		deferredObject.resolve({ success: true });
        	} else {
        		deferredObject.resolve({ success: false });
        	}
        }).
        error(function () {
        	deferredObject.resolve({ success: false });
        });
        */
		return deferredObject.promise;
	}
}

RegistrationFactory.$inject = ['$http', '$q'];