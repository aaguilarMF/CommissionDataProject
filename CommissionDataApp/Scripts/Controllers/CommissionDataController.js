var CommissionDataController = function ($scope, CommissionFactory) {
    $scope.height = {
        height: 60,
        newHeight: function (numOfRows) {
            var requestedHeight = 30 +(30 * numOfRows);
            if (requestedHeight > 480) {
                $scope.height.height = 500;
            } else {
                $scope.height.height = requestedHeight;
            }
            
        }
    }
    $scope.gridFilled = false;
    $scope.toggleGridFilled = function () {
        $scope.gridFilled = !$scope.gridFilled;
    };
    $scope.populateCommissionTable = function () {
        var result = CommissionFactory.getAllCommissionData();
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                var columnDefs = [];
                var target = data[0];
                for (var k in target) {
                    if (target.hasOwnProperty(k)) {
                        if (String(k).length > 2) {
                            columnDefs.push({ field: String(k), displayName: k });
                        } else {
                            columnDefs.push({ field: String(k), displayName: k });
                        }

                    }
                }
                $scope.gridOptions.data = data;
                $scope.gridOptions.columnDefs = columnDefs;

                $scope.height.newHeight(data.length);
                //for div hide or appear stuff
                $scope.gridFilled = true;

            }
            else { //this fires if we don't even reach webapi
                $scope.noCustomerFound = true;
                $scope.gridFilled = false;
                //$scope.noCustomerFoundDialog
            }
        }, function () { alert("don't think we'll ever get here") })
    };
    $scope.gridOptions = {
        data: null,
        columnDefs: null
    }
    $scope.populateCommissionTable();
};

CommissionDataController.$inject = ['$scope', 'CommissionFactory'];