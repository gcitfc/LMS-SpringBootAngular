lmsApp.controller("branchController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/admin/readBranches?searchString=").success(function(data) {
		$scope.branches = data;
		$scope.numOfBranches = data.length;
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/publisher";
	};
	
	$scope.createBranch = function(){
		if($scope.branchName == null || $scope.address == null ) {
			alert("Input(s) Required")
			return
		}
		
		var branch = {
				branchId : null,
				branchName : $scope.branchName,
				address : $scope.address
		}
		console.log(branch)
		$http.post("http://localhost:8070/lms/admin/updateBranch", JSON.stringify(branch)).success(function(data){})
		$window.location = "#/branch";
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
		$http.post("http://localhost:8070/lms/admin/updateBranch", JSON.stringify(branch)).success(function(data){
			
		})
		$window.location = "#/branch";
	};
	
	$scope.deleteBranch = function(){
		if($scope.thisBranch == null) {
			alert("Input(s) Required")
			return
		}
		var obj = JSON.parse($scope.thisBranch)
		var branch = {
				branchId : obj.branchId
		}
		$http.post("http://localhost:8070/lms/admin/updateBranch", JSON.stringify(branch)).success(function(data){})
		$window.location = "#/branch";
	};
	
	
	
})