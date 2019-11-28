lmsApp.controller("librarianController", function($scope, $http, $window, lmsConstants) {
	
	var copies
	
	$http.get(lmsConstants.URL_PREFIX + "/readBranches?searchString=").success(function(data) {
		$scope.branches = data;
		$scope.numOfBranches = data.length;
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/lib";
	};
	

	$scope.updateBranch = function(){
		if($scope.thisBranch == null) {
			alert("Input(s) Required")
			return
		}
		var obj = JSON.parse($scope.thisBranch)
		var branchId = obj.branchId
		var newName = obj.branchName
		var newAddress = obj.address
		if($scope.newName != null)
			newName = $scope.newName
		if($scope.newAddress != null)
			newAddress = $scope.newAddress
		var branch = {
				branchId : branchId,
				branchName : newName,
				address : newAddress
		}
		console.log(branch)
		$http.post(lmsConstants.URL_PREFIX + "/updateBranch", JSON.stringify(branch)).success(function(data){
			
		})
		alert("Submitted")
		$window.location = "#/lib"
	};
	
	$scope.addCopies = function() {
		var branchObj = JSON.parse($scope.thisBranch)
		var branchId = branchObj.branchId
		console.log(branchId)
		$http.get(lmsConstants.URL_PREFIX + "/readBookCopies", 
				{ params: {
					    	branchId : branchId
					}
				}).success(function(data){
					$scope.copies = data;
					$scope.numOfBooks = data.length;
					console.log(data)
			});
	}
	
	$scope.editCopies = function(bc) {
		window.copies = bc
		//console.log(window.record)
	};
	
	$scope.updateCopies = function() {
		newCopies = $scope.newCopies
		var copy = window.copies
		copy.noOfCopies = newCopies
		console.log(copy)
		$http.post(lmsConstants.URL_PREFIX + "/updateCopies", copy).success(function(data){})
	};
})