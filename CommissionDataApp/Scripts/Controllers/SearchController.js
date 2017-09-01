﻿var SearchController = function ($scope, SearchServices, CommissionRepresentativeFactory, CommissionFactory) {
    $scope.searchByCustomerNoHeader = 'Search By Customer_No';
    $scope.height = {
        height: 60,
        newHeight : function(numOfRows){
            $scope.height.height = 60 * numOfRows;
        }
    };
    $scope.searchByCustomerNoVal = null;
    $scope.searchByCustomerNo = function () {
        var result = SearchServices.searchByCustomerNo($scope.searchByCustomerNoVal);
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                var columnDefs = [];
                var target = data;
                for (var k in target) {
                    if (target.hasOwnProperty(k)) {
                        if (String(k).length > 2) {
                            columnDefs.push({ field: String(k), displayName: k });
                        } else {
                            columnDefs.push({ field: String(k), displayName: k });
                        }

                    }
                }
                $scope.gridOptions.data = [data];
                $scope.gridOptions.columnDefs = columnDefs;

                //for div hide or appear stuff
                $scope.gridFilled = true;
                $scope.noCustomerFound = false;

            }
            else { //this fires if we don't even reach webapi
                $scope.noCustomerFound = true;
                $scope.gridFilled = false;
                //$scope.noCustomerFoundDialog
            }
        }, function () { alert("don't think we'll ever get here") })
    };
    $scope.newEntryModel = {
        customerNumber: null,
        respresentativeId: null,
        commission: null
    }
    $scope.createNewCustomerCommissionEntry = function () {
        $scope.getReps();
        $scope.toggleModal();
    };
    $scope.gridFilled = false;
    $scope.gridOptions = {
        data: [{}] // 'washCoatData'
        , columnDefs: []
    };
    
    $scope.modalShown = false;
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.getReps = function () {
        var result = CommissionRepresentativeFactory.getRepresentatives();
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                $scope.repData.availableReps =  data;
            } else { //this fires if we don't even reach webapi
                alert("failure");
                //$scope.noCustomerFoundDialog
            }
        });
    }
    $scope.repData = {
        representativeModel: null,
        availableReps: null
    };
    $scope.save = function () {
        var result = CommissionFactory.save($scope.newEntryModel);
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                var columnDefs = [];
                var target = data;
                for (var k in target) {
                    if (target.hasOwnProperty(k)) {
                        if (String(k).length > 2) {
                            columnDefs.push({ field: String(k), displayName: k });
                        } else {
                            columnDefs.push({ field: String(k), displayName: k });
                        }

                    }
                }
                $scope.gridOptions.data = [data, data, data, data, data, data, data, data, data, data, data];
                $scope.gridOptions.columnDefs = columnDefs;

                //for div hide or appear stuff
                $scope.gridFilled = true;
                $scope.noCustomerFound = false;
                $scope.toggleModal();
            } else { //this fires if we don't even reach webapi
                alert("failure to save commission");
                //$scope.noCustomerFoundDialog
            }
        });
    };
    
    $scope.noCustomerFound = false;
    $scope.noCustomerFoundDialog = "No Customer Found. Would You like to add Add new Customer Number entry?"

}
SearchController.$inject = ['$scope', 'SearchServices', 'CommissionRepresentativeFactory', 'CommissionFactory'];