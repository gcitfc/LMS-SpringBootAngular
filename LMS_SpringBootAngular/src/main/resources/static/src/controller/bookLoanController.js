lmsApp.controller("bookLoanController", function($scope, $http, $window) {
	
	var record
	
	$http.get("http://localhost:8070/lms/readBorrowers?searchString=").success(function(data) {
		$scope.borrowers = data;
		$scope.numOfBorrowers = data.length;
	})
	
	$http.get("http://localhost:8070/lms/readBranches?searchString=").success(function(data) {
		$scope.branches = data;
		$scope.numOfBranches = data.length;
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/override";
	};
	
	$scope.search = function(){
		var deferred = $.Deferred();
		if($scope.thisBranch == null || $scope.thisBorrower == null) {
			alert("Input(s) Required")
			return
		}
		var branchObj = JSON.parse($scope.thisBranch)
		var borrowerObj = JSON.parse($scope.thisBorrower)
		var cardNo = borrowerObj.cardNo
		var branchId = branchObj.branchId
		var loan = {
			borrower : {
				cardNo : cardNo
			},
			branch : {
				branchId : branchId
			}
		}
		console.log(loan)
		$http.get("http://localhost:8070/lms/getLoansByBnB", 
				{ params: {
					    	cardNo : cardNo,
					    	branchId : branchId
					}
				}).success(function(data){
					$scope.records = data;
					$scope.numOfRecords = data.length;
					console.log(data)
			});
		
	};
	
	$scope.editDue = function(r) {
		window.record = r
		//console.log(window.record)
	};
	
	$scope.updateDue = function() {
		newDue = $scope.newDuedate
		var loan = window.record
		loan.dueDate = newDue
		console.log(loan)
		$http.post("http://localhost:8070/lms/overrideDue", loan).success(function(data){})
	};
	
})