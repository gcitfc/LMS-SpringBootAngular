lmsApp.controller("borrowerController", function($scope, $http, $window, lmsConstants, Pagination) {
	$http.get(lmsConstants.URL_PREFIX + "/readBorrowers?searchString=").success(function(data) {
		$scope.borrowers = data;
		$scope.numOfBorrowers = data.length;
		
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil($scope.borrowers.length
				/ $scope.pagination.perPage);
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/borrowerList";
	};
	
	$scope.createBorrower = function(){
		if($scope.borrowerName == null || $scope.address == null || $scope.phone == null) {
			alert("Input(s) Required")
			return
		}
		
		var borrower = {
				name : $scope.borrowerName,
				address : $scope.address,
				phone : $scope.phone,
				books : null
		}
		
		$http.post(lmsConstants.URL_PREFIX + "/updateBorrower", JSON.stringify(borrower)).success(function(data){
			
		})
		$window.location = "#/borrowerList";
	};
	
	$scope.updateBorrower = function(){
		if($scope.thisBorrower == null) {
			alert("Input(s) Required")
			return
		}
		var obj = JSON.parse($scope.thisBorrower)
		var cardNo = obj.cardNo
		var newName = obj.name
		var newAddress = obj.address
		var newPhone = obj.phone
		if($scope.newName != null)
			newName = $scope.newName
		if($scope.newAddress != null)
			newAddress = $scope.newAddress
		if($scope.newPhone != null)
			newPhone = $scope.newPhone
		var borrower = {
				cardNo : cardNo,
				name : newName,
				address : newAddress,
				phone : newPhone
		}
		$http.post(lmsConstants.URL_PREFIX + "/updateBorrower", JSON.stringify(borrower)).success(function(data){
			
		})
		$window.location = "#/borrowerList";
	};
	
	$scope.deleteBorrower = function(){
		if($scope.thisBorrower == null) {
			alert("Input(s) Required")
			return
		}
		var obj = JSON.parse($scope.thisBorrower)
		var borrower = {
				cardNo : obj.cardNo
		}
		$http.post(lmsConstants.URL_PREFIX + "/updateBorrower", JSON.stringify(borrower)).success(function(data){})
		$window.location = "#/borrowerList";
	};
	
	
	
})