
deviceManager.controller('HomeCtrl',
    ['$scope', '$http',
    function ($scope, $http) {

        $scope.devices = [];
        $scope.errorMessage = "";

        function reload() {

            $http.get('/Home/GetDevices')
                .success(function (devices, status, headers, config) {
                    $scope.devices = devices;
                })
                .error(function (data, status, headers, config) {

                });
        }

        function handleError(error) {
            var text = error + (error.request ? ' - ' + error.request.status : '');
            $scope.errorMessage = text;
        }

        reload();


    }]);