
deviceManager.register.controller('HomeCtrl',
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

        

        $scope.sendMessage= function(device) {
            bootbox.prompt("Message details", function (result) {
                if (result === null) {
                    
                } else {
                    var client = new WindowsAzure.MobileServiceClient('https://mcom-device-list.azure-mobile.net/', 'fevVWOAOauhjDswvLdefrcWMQgUuOi19');

                    // Asynchronously call the custom API using the POST method.
                    client.invokeApi("sendmessage", {
                        body: {
                            Message: result,
                            OS: device.os.toLowerCase(),
                            PushId: device.push_id
                        },
                        method: "post"
                    }).done(function (results) {
                        bootbox.alert("Message sent.");
                    }, function (error) {
                        alert(error.message);
                    });
                }
            });
        }
        

    }]);