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
	$scope.updateID = "";
	$scope.tableView = false;
	$scope.tileView = true;
	$scope.newDocView = false;

	$scope.accessToken = "ba2b81b86d21befe556ac4a55583f168d577e2ce-e5f33805ca96b3aa7c3285fc9c498ae2bcb035e2";

	const defaultURL = "https://alpha-dataflownode.zerionsoftware.com/code_assignment/records";


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
           "Authorization": "Bearer " + $scope.accessToken,
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

	const getItem = {
   method: 'GET',
   url: defaultURL,
   headers: 
         { 
           "Authorization": "Bearer " + $scope.accessToken
         }
	}

	$scope.$watch('updateVisibility', () => {
		$scope.buttonvalue = $scope.updateVisibility ? "hide the Div" : "Show the Div";
	})

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

	$scope.init = () => {
		$scope.returnData();
	}

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

	$scope.updateTile= (id) => {
		updateArg.url = defaultURL + "/" + id;
		console.log(id, 'id');
		// updateArg.body.name = $scope.updateName;
		// updateArg.body.description = $scope.updateDesc;
		// updateArg.body.imgs[0].url = $scope.updateURL;

	  updateArg.data = { 
      name: $scope.updateName, 
      description: $scope.updateDesc, 
      imgs:[
        {
          url: $scope.updateURL
        }
      ],
    };



		console.log(updateArg, "updateArg");

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


	$scope.toggleDetailView = (idNum) => {

		let element = $scope.results.find((x) => {
			return x._id === idNum
		});

		console.log(element, 'element');
		console.log(idNum, 'idNum');
		$scope.updateName = element["name"];
		$scope.updateDesc = element.description;
		$scope.updateURL = element.imgs[0].url;
		$scope.updateID = idNum;
		$scope.updateVisibility = !$scope.updateVisibility;
	}
});

/*

	$scope.singleGrab = () => {
	
		$http(getItem).then((data, err) => {
			if (err) {
				return "error: " + err;
				console.log("error: " + err);
			} else {
				data.data.name
				data.data.description
				data.img[0].url

				//have above info auto-populate input field, so that people can change
				// once clicked on update, a person 
			}
		})

	}
	
*/
// CREATE INPUT FOR IMG URL, NAME, AND DESCRIPTION.
// MAKE SURE EVERYTHING IS MANDATORY EXCEPT FOR DESCRIPTION
// BUTTON EXECUTES THE POST REQUEST
// upon making the post request, a get request is executed to get the new data.
//
// DELETE... all images would be assigned an array value, and upon clicking, the array value deletion is requested, followed by get request

