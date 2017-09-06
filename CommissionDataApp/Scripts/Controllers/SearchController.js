var SearchController = function ($scope, SearchServices, CommissionRepresentativeFactory, CommissionFactory, uiGridConstants) {
    $scope.searchByCustomerNoHeader = 'Search By Customer_No';
    $scope.height = {
        height: 61,
        newHeight : function(numOfRows){
            $scope.height.height = 60 * numOfRows;
        }
    };
    $scope.searchByCustomerNoVal = null;
    $scope.searchByCustomerNo = function () {
        $scope.editModel.showButton = false;
        var result = SearchServices.searchByCustomerNo($scope.searchByCustomerNoVal);
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                var colsToShow = [false, true, false, true, true];
                var editable = [false, false, false, false, true];
                var columnDefs = [];
                var target = data;
                var col = 0;
                for (var k in target) {
                    if (colsToShow[col]) {
                        if (target.hasOwnProperty(k)) {
                            if (String(k).length > 2) {
                                columnDefs.push({
                                    field: String(k), displayName: k, enableCellEdit: editable[col]
                                });
                            } else {
                                columnDefs.push({ field: String(k), displayName: k, cellClass: null });
                            }
                        }
                    }
                    col++;
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
        customerNumber: '',
        respresentativeId: null,
        commission: null
    }
    $scope.createNewCustomerCommissionEntry = function () {
        $scope.getReps();
        $scope.toggleModal();
    };
    $scope.gridFilled = false;
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        data: [{}] // 'washCoatData'
        , columnDefs: []
    };
    $scope.activeCustomers = null;
    $scope.getActiveCustomers = function () {
        var result = CommissionFactory.getActiveCustomers();
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                $scope.activeCustomers = data;
            } else { //this fires if we don't even reach webapi
                alert("failure");
                //$scope.noCustomerFoundDialog
            }
        });
    }
    $scope.deleteRow = function () {
        //$scope.gridOptions.data = vm.resultSimulatedData;
        var selectedRow = $scope.gridApi.selection.getSelectedRows(); //<--Property undefined error here
        if (selectedRow[0]) {
            var result = CommissionFactory.deleteRow(selectedRow[0]);
            result.then(function (response) {
                if (response.success) {
                    $scope.gridOptions.data = [];
                    $scope.gridFilled = false;
                    $scope.editModel.showButton = false;
                } else { //this fires if we don't even reach webapi
                    alert(response.message);
                    //$scope.noCustomerFoundDialog
                }
            });
        } else {
            alert('Select a row by clicking on it first');
        }
        /*$timeout(function () {
            if (vm.gridApi.selection.selectedRow) {
                vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
            }
        });*/
    };
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
            if (!$scope.editModel.hasChanged) {
                if (!(newValue === oldValue)) {
                    $scope.editModel.showButton = true;
                }
            }
            if (!(newValue === oldValue)) {
                colDef.cellClass = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    return "redtext";
                }; 
            }
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            
            //Do your REST call here via $http.get or $http.post

            //Alert to show what info about the edit is available
            //alert('Column: ' + colDef.name + ' ID: ' + rowEntity.id + ' Name: ' + rowEntity.name + ' Age: ' + rowEntity.age);
        });
        
    };
    $scope.editModel = {
        showButton: false,
        hasChanged: false
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
    $scope.searchModal = {
        matchingResult: false,
        regex: null,
        escapeRegExp: function (string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        },
        filterBySearch: function (customerKeyValue) {
            if (!$scope.newEntryModel.customerNumber) { $scope.searchModal.matchingResult = false; return false; }
            if ($scope.newEntryModel.customerNumber == customerKeyValue.CUSTOMER_ID) {
                $scope.searchModal.matchingResult = true;
                return true;
            }


        }
    };
    $scope.save = function () {
        if (!$scope.searchModal.matchingResult) {
            alert('Customer Number needs to match an active customer. Search.');
            return;
        }
        if ($scope.newEntryModel.representativeId == null || $scope.newEntryModel.commission == null) {
            alert("Representative and Commission must not be null");
            return;
        }
        var result = CommissionFactory.save($scope.newEntryModel);
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                var colsToShow = [false, true, false, true, true];
                var editable = [false, false, false, false, true];
                var columnDefs = [];
                var target = data;
                var curr = 0;
                for (var k in target) {
                    if (colsToShow[curr]) {
                        if (target.hasOwnProperty(k)) {
                            if (String(k).length > 2) {
                                columnDefs.push({ field: String(k), displayName: k, enableCellEdit: editable[curr]  });
                            } else {
                                columnDefs.push({ field: String(k), displayName: k });
                            }

                        }
                    }
                    curr++;;
                }
                $scope.gridOptions.data = [data];
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
    $scope.saveEdit = function () {
        var row =$scope.gridOptions.data[0];
        var result = CommissionFactory.save({
            customerNumber: row.CUSTOMER_NO,
            representativeId: row.REP_ID,
            commission: row.COMMISSION,
            COMMISSION_ID: row.COMMISSION_ID,
        }
        );
        result.then(function (response) {
            if (response.success) {
                var data = response.data;
                var colsToShow = [false, true, false, true, true];
                var editable = [false, false, false, false, true];
                var columnDefs = [];
                var target = data;
                var curr = 0;
                for (var k in target) {
                    if (colsToShow[curr]) {
                        if (target.hasOwnProperty(k)) {
                            if (String(k).length > 2) {
                                columnDefs.push({ field: String(k), displayName: k, enableCellEdit: editable[curr] });
                            } else {
                                columnDefs.push({ field: String(k), displayName: k });
                            }

                        }
                    }
                    curr++;;
                }
                $scope.gridOptions.data = [data];
                $scope.gridOptions.columnDefs = columnDefs;

                //for div hide or appear stuff
                $scope.gridFilled = true;
                $scope.noCustomerFound = false;
                $scope.editModel.showButton = false;
            } else { //this fires if we don't even reach webapi
                alert("failure to save commission");
                //$scope.noCustomerFoundDialog
            }
        });
    };
    $scope.$watch('newEntryModel.customerNumber', function (value) {
        $scope.searchModal.regex = new RegExp('\\b' + $scope.searchModal.escapeRegExp(value), 'i');
    });

    
    $scope.noCustomerFound = false;
    $scope.noCustomerFoundDialog = "No Customer Found. Would You like to add Add new Customer Number entry?"

    /* run these on instantiation*/
    $scope.getActiveCustomers();

}
SearchController.$inject = ['$scope', 'SearchServices', 'CommissionRepresentativeFactory', 'CommissionFactory', 'uiGridConstants'];