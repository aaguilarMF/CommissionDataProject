var CommissionFactory = function ($http, $q) {
    var save = function (commissionEntry) {
        var deferredObject = $q.defer();

        var req = {
            method: 'POST',
            url: '/Commission/Save',
            headers: {
                'Content-Type': 'application/json'
            },
            data: commissionEntry
        }
        $http(req).then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
            if (response.data.Success) {
                deferredObject.resolve({
                    success: true,
                    data: JSON.parse(response.data.JSON_RESPONSE_DATA)
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
        return deferredObject.promise;
    };
    var deleteRow = function (commissionEntry) {
        var deferredObject = $q.defer();

        var req = {
            method: 'POST',
            url: '/Commission/Delete',
            headers: {
                'Content-Type': 'application/json'
            },
            data: commissionEntry
        }
        $http(req).then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
            if (response.data.Success) {
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
        return deferredObject.promise;
    };
    var getAllCommissionData = function () {
        var deferredObject = $q.defer();

        
        $http.get('/Commission/GetAllCommissionData')
            .then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
            if (response.data.Success) {
                deferredObject.resolve({
                    success: true,
                    data: JSON.parse(response.data.JSON_RESPONSE_DATA)
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
        return deferredObject.promise;
    };
    var getActiveCustomers = function () {
        var deferredObject = $q.defer();


        $http.get('/Commission/GetActiveCustomers')
            .then(function (response) { //a response will return with an obect indicating success of data retriveal or some known result. Error would indicate webapi wasn't even reached
                if (response.data.Success) {
                    deferredObject.resolve({
                        success: true,
                        data: JSON.parse(response.data.JSON_RESPONSE_DATA)
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
        return deferredObject.promise;
    };
    return {
        save: save,
        deleteRow: deleteRow,
        getAllCommissionData: getAllCommissionData,
        getActiveCustomers: getActiveCustomers
    }
}

CommissionFactory.$inject = ['$http', '$q'];