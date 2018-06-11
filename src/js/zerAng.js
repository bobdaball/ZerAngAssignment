'use strict';

var zerAng = angular.module('zerAng', []);

zerAng.controller('zerAng', ($scope, $location, $http) => {
	$scope.first = 1;
	$scope.second = 1;
	$scope.results;
	$scope.accessToken = "ba2b81b86d21befe556ac4a55583f168d577e2ce-e5f33805ca96b3aa7c3285fc9c498ae2bcb035e2";

	$scope.updateValue = () => {
		$scope.calculation = $scope.first + ' + ' + $scope.second
 		+ " = " + (+$scope.first + +$scope.second);
	};

	

	var tilesReq = {
   method: 'GET',
   url:"https://alpha-dataflownode.zerionsoftware.com/code_assignment/records",
   headers: 
         { 
           "Authorization": "Bearer " + $scope.accessToken
         }
	};

	$scope.returnData = () => {

		$http(tilesReq).then((data, err) => {
		if (err) {
			return "error: " + err;
			console.log(err);
		} else {
			$scope.results = data.data;
			console.log(data);
		}
		})
	};




});

// CREATE INPUT FOR IMG URL, NAME, AND DESCRIPTION.
// MAKE SURE EVERYTHING IS MANDATORY EXCEPT FOR DESCRIPTION
// BUTTON EXECUTES THE POST REQUEST
// upon making the post request, a get request is executed to get the new data.
//
// DELETE... all images would be assigned an array value, and upon clicking, the array value deletion is requested, followed by get request