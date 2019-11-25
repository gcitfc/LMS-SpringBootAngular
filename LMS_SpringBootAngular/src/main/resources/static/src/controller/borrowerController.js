lmsApp.controller("borrowerController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/readBorrowers?searchString=").success(function(data) {
		$scope.borrowers = data;
		$scope.numOfBorrowers = data.length;
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
		
		$http.post("http://localhost:8070/lms/updateBorrower", JSON.stringify(borrower)).success(function(data){
			
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
		$http.post("http://localhost:8070/lms/updateBorrower", JSON.stringify(borrower)).success(function(data){
			
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
		$http.post("http://localhost:8070/lms/updateBorrower", JSON.stringify(borrower)).success(function(data){})
		$window.location = "#/borrowerList";
	};
	
	
	
})