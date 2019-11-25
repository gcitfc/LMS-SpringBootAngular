lmsApp.controller("librarianController", function($scope, $http, $window) {
	
	var copies
	
	$http.get("http://localhost:8070/lms/readBranches?searchString=").success(function(data) {
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
		$http.post("http://localhost:8070/lms/updateBranch", JSON.stringify(branch)).success(function(data){
			
		})
		alert("Submitted")
		$window.location = "#/lib"
	};
	
	$scope.addCopies = function() {
		var branchObj = JSON.parse($scope.thisBranch)
		var branchId = branchObj.branchId
		console.log(branchId)
		$http.get("http://localhost:8070/lms/readBookCopies", 
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
		$http.post("http://localhost:8070/lms/updateCopies", copy).success(function(data){})
	};
})