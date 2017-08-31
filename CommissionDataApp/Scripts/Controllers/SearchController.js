var SearchController = function ($scope, SearchServices) {
    $scope.searchByCustomerNoHeader = 'Search By Customer_No';
    $scope.searchByCustomerNoVal = null;
    $scope.searchByCustomerNo = function () {
        var result = SearchServices.searchByCustomerNo($scope.searchByCustomerNoVal);
        result.then(function (response) {
            if (response.success) {
                alert("got customer "+response.data)
            }
            else {
                alert("got error")
            }
        })
    }
}
SearchController.$inject = ['$scope', 'SearchServices'];