lmsApp.controller("branchController", function($scope, $http, $window, lmsConstants, Pagination) {
	$http.get(lmsConstants.URL_PREFIX+"/readBranches?searchString=").success(function(data) {
		$scope.branches = data;
		$scope.numOfBranches = data.length;
		
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil($scope.branches.length
				/ $scope.pagination.perPage);
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/branch";
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
		$http.post(lmsConstants.URL_PREFIX+"/updateBranch", JSON.stringify(branch)).success(function(data){})
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
		$http.post(lmsConstants.URL_PREFIX+"/updateBranch", JSON.stringify(branch)).success(function(data){
			
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
		$http.post(lmsConstants.URL_PREFIX+"/updateBranch", JSON.stringify(branch)).success(function(data){})
		$window.location = "#/branch";
	};
	
})