
deviceManager.controller('HomeCtrl',
    ['$scope',
    function ($scope) {
        var client = new WindowsAzure.MobileServiceClient('https://mcom-device-list.azure-mobile.net/', 'fevVWOAOauhjDswvLdefrcWMQgUuOi19');
        var deviceTable = client.getTable('Device');

        $scope.devices = [];
        $scope.errorMessage = "";

        function reload() {
            var query = deviceTable.where({});

            query.read().then(function (devices) {
                $scope.devices = devices;
                $scope.$apply();
            }, handleError);
        }

        function handleError(error) {
            var text = error + (error.request ? ' - ' + error.request.status : '');
            $scope.errorMessage = text;
        }

        reload();


    }]);