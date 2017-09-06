var SearchServices = function ($http, $q) {
    this.searchByCustomerNo = function (customerNo) {
        var deferredObject = $q.defer();

        $http.get(
            '/Commission/GetCustomer'+'?customerNumber='+customerNo
        ).then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
            if (response.data.Success) {
                deferredObject.resolve({
                    success: true,
                    data: JSON.parse( response.data.JSON_RESPONSE_DATA)
                });
            } else {
                deferredObject.resolve( {
                    success: false,
                    message: response.data.Message
                });
            }
            
        }//     response.data);
        , function (error) { //it never goes in here
            deferredObject.resolve( {
                success: false,
                data: error.data
            })
        });
        return deferredObject.promise;
    }
}

SearchServices.$inject = ['$http', '$q'];