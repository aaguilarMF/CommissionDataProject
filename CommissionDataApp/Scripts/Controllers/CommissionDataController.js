var CommissionDataController = function ($scope, CommissionFactory, uiGridConstants) {
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
    $scope.editModel = {
        showButton: false,
        hasChanged: false
    };
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
                var colsToShow = [false, true, false, true, true];
                var editable = [false, false, false, false, true];
                var target = data[0];
                var col = 0;
                for (var k in target) {
                    if (colsToShow[col]) {
                        if (target.hasOwnProperty(k)) {
                            if (String(k).length > 2) {
                                columnDefs.push({ field: String(k), displayName: k, enableCellEdit: editable[col]});
                            } else {
                                columnDefs.push({ field: String(k), displayName: k });
                            }

                        }
                    }
                    
                    col++;
                }
                for (var i = 0; i < data.length; i++) {
                    data[i].hasBeenEdited = false;
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
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        data: null,
        columnDefs: null
    }
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
                    if (row.entity.COMMISSION_ID == rowEntity.COMMISSION_ID) {
                        row.entity.hasBeenEdited = true;
                        return "redtext";
                    }
                    else
                        return null;
                };
            }
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);

            //Do your REST call here via $http.get or $http.post

            //Alert to show what info about the edit is available
            //alert('Column: ' + colDef.name + ' ID: ' + rowEntity.id + ' Name: ' + rowEntity.name + ' Age: ' + rowEntity.age);
        });

    };
    $scope.deleteRow = function () {
        //$scope.gridOptions.data = vm.resultSimulatedData;
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        var row = selectedRows[0];
        if (row) {
        } else {
            alert('Select a row in order to delete');
            return;
        }
        if (row) {
            var result = CommissionFactory.deleteRow(row);
            result.then(function (response) {
                if (response.success) {
                    $scope.populateCommissionTable();
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
    $scope.saveEdit = function () {
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        var row = selectedRows[0];
        if (!row.hasBeenEdited) {
            alert("please select a row that has been ediited");
            return;
        }
        if (row) {
            alert('Selected Row: ' + row.COMMISSION_ID + ', ' + row.REP_ID + '.');
        } else {
            alert('Select a row whose changes you want to save');
            return;
        }
        var result = CommissionFactory.save({
            customerNumber: row.CUSTOMER_NO,
            representativeId: row.REP_ID,
            commission: row.COMMISSION,
            COMMISSION_ID: row.COMMISSION_ID,
        }
        );
        result.then(function (response) {
            if (response.success) {
                $scope.populateCommissionTable();
                /*
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
                */
                //for div hide or appear stuff
                $scope.editModel.showButton = false;
            } else { //this fires if we don't even reach webapi
                alert("failure to save commission");
                //$scope.noCustomerFoundDialog
            }
        });
    };

    $scope.populateCommissionTable();
};

CommissionDataController.$inject = ['$scope', 'CommissionFactory', 'uiGridConstants'];