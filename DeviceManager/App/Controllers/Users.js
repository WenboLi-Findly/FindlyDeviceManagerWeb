
deviceManager.controller('UsersCtrl',
    ['$scope', '$http',
    function ($scope, $http) {

        $scope.users = [];
        $scope.errorMessage = "";

        function reload() {

            $http.get('/Home/GetUsers')
                .success(function (users, status, headers, config) {
                    $scope.users = users;
                })
                .error(function (data, status, headers, config) {
                    handleError(data);
                });
        }

        function handleError(error) {
            var text = error + (error.request ? ' - ' + error.request.status : '');
            $scope.message = text;
        }

        reload();

       


        $scope.createUser = function () {
            $scope.message = "";
            var user = {};
            if ($scope.password != $scope.repeatpassword) {
                $scope.message = "Password and Repeat password must be the same.";
                return;
            }
            user.UserName = $scope.username;
            user.Password = $scope.password;
            user.ConfirmPassword = $scope.repeatpassword;
            $scope.loading = true;
            $http.post('/Account/Register', user)
                    .success(function (data, status, headers, config) {
                        reload();
                        $scope.loading = false;
                        resetUser();
                    })
                    .error(function (data, status, headers, config) {
                        handleError(data);
                        $scope.loading = false;
                        resetUser();
                    });

            function resetUser() {
                $scope.username = "";
                $scope.password = "";
                $scope.repeatpassword = "";
            }

        }


    }]);