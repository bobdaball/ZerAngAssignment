'use strict';

var zerAng = angular.module('zerAng', []);

zerAng.controller('zerAng', ($scope, $location, $http) => {
	$scope.first = 1;
	$scope.second = 1;
	$scope.results;
	$scope.picName = "";
	$scope.picDesc = "";
	$scope.picURL = "";
	$scope.updateName = "";
	$scope.updateDesc = "";
	$scope.updateURL = "";
	$scope.updateVisibility = false;


	$scope.$watch('updateVisibility', () => {
		$scope.buttonvalue = $scope.updateVisibility ? "hide the Div" : "Show the Div";
	})

	const defaultURL = "https://alpha-dataflownode.zerionsoftware.com/code_assignment/records";

	$scope.accessToken = "ba2b81b86d21befe556ac4a55583f168d577e2ce-e5f33805ca96b3aa7c3285fc9c498ae2bcb035e2";
	
	const tilesReq = {
   method: 'GET',
   url: defaultURL,
   headers: 
         { 
           "Authorization": "Bearer " + $scope.accessToken
         }
	};

	const addTile = {
   method: 'POST',
   url: defaultURL,
   headers: 
         { 
           "Authorization": "Bearer " + $scope.accessToken,
           "content-type": "application/json"
         },
   body: { 
           name: $scope.picName, 
           description: $scope.picDesc, 
           imgs:[
              {
                "url": $scope.picURL
              }
           ]
        }
	};

	const deleteArg = {
   method: 'DELETE',
   url: defaultURL,
   headers: 
         { 
           "Authorization": "Bearer " + $scope.accessToken
         }
	};    

	const updateArg = {
   method: 'PUT',
   url: defaultURL,
   headers: 
         { 
           "Authorization": "Bearer {{accessToken}}",
           "content-type": "application/json"
         },
   body: { 
           "name": $scope.updateName, 
           "description": $scope.updateDesc, 
           "imgs":[
               {
                "url": $scope.updateURL
              }
           ],
         }
	}


	$scope.updateValue = () => {
		$scope.calculation = $scope.first + ' + ' + $scope.second
 		+ " = " + (+$scope.first + +$scope.second);
	};

	$scope.returnData = () => {
		$http(tilesReq).then((data, err) => {
		if (err) {
			return "error: " + err;
			console.log(err);
		} else {
			$scope.results = data.data;
			console.log(data.data, "data.data");
		}
		})
	};

	$scope.addData = () => {
		console.log($scope.picName, "$scope.picName");
		console.log($scope.picDesc, "$scope.picDesc");
		console.log($scope.picURL, "$scope.picURL");
		console.log(addTile, "data");

		addTile.data = { 
           name: $scope.picName, 
           description: $scope.picDesc, 
           imgs:[
              {
                "url": $scope.picURL
              }
           ]
        };

		console.log(addTile.body, "data body");

		$http(addTile).then((data, err) => {
			if (err) {
				return "error: " + err;
				console.log("error: " + err);	
			} else {
				$scope.returnData();
				console.log("data added!")
			}
		})
	}

	$scope.deleteData = (id) => {
		deleteArg.url = defaultURL + "/" + id;
		console.log(id, "id");

		$http(deleteArg).then((data, err) => {
			if (err) {
				return "error: " + err;
				console.log("error: " + err);
				deleteArg.url = defaultURL;
			} else {
				$scope.returnData();
				console.log("data deleted!");
				deleteArg.url = defaultURL;
			}
		})
	}

	$scope.updateArg = (id) => {
		updateArg.url = defaultURL + "/" + id;
		
		$http(updateArg).then((data, err) => {
			if (err) {
				return "error: " + err;
				console.log("error: " + err);
				updateArg.url = defaultURL;
			} else {
				$scope.returnData();
				console.log('data updated');
				updateArg.url = defaultURL;
			}
		})
	}


});

// CREATE INPUT FOR IMG URL, NAME, AND DESCRIPTION.
// MAKE SURE EVERYTHING IS MANDATORY EXCEPT FOR DESCRIPTION
// BUTTON EXECUTES THE POST REQUEST
// upon making the post request, a get request is executed to get the new data.
//
// DELETE... all images would be assigned an array value, and upon clicking, the array value deletion is requested, followed by get request

