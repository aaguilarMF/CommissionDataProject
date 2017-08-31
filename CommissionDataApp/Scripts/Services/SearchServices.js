var SearchServices = function ($http, $q) {
    this.searchByCustomerNo = function (customerNo) {
        var deferredObject = $q.defer();

        $http.get(
            '/Commission/GetCustomer'+'?customerNumber='+customerNo
        ).then(function (response) {
            deferredObject.resolve( {
                success: true,
                data: response.data
            }
           )//     response.data);
        }, function (error) {
            deferredObject.resolve( {
                success: false,
                data: error.data
            })
        });
        return deferredObject.promise;
    }
}

SearchServices.$inject = ['$http', '$q'];