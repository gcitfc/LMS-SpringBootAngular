lmsApp.controller("userController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/admin/readBranches?searchString=").success(function(data) {
		$scope.branches = data;
		$scope.numOfBranches = data.length;
	})
	
	$http.get("http://localhost:8070/lms/admin/readBorrowers?searchString=").success(function(data) {
		$scope.borrowers = data;
		$scope.numOfBorrowers = data.length;
	})
	
	$scope.validCardNo = function(cardNo) {
		var borrowers = $scope.borrowers
		var flag = 0
		for(var i = 0; i < $scope.numOfBorrowers; i++) {
			if(borrowers[i].cardNo == cardNo) {
				console.log(borrowers[i].cardNo, cardNo)
				flag = 1
				break
			}
		}
		return flag == 1
	};
	
	$scope.returnBook = function() {
		var branchObj = JSON.parse($scope.thisBranch)
		var branchId = branchObj.branchId
		if($scope.cardNo == null || this.validCardNo($scope.cardNo) == false) {
			alert("Invalid Card Number")
			return
		}
		var cardNo = $scope.cardNo
		
		$http.get("http://localhost:8070/lms/borrower/readBooksByBB", 
				{ params: {
							cardNo : cardNo,
					    	branchId : branchId
					}
				}).success(function(data){
					$scope.checkOutCopies = null;
					$scope.copies = data;
					//$scope.numOfBooks = data.length;
					console.log(data)
			});
		
	};
	
	$scope.checkOutBook = function() {
		if($scope.cardNo == null || this.validCardNo($scope.cardNo) == false) {
			alert("Invalid Card Number")
			return
		}
		var branchObj = JSON.parse($scope.thisBranch)
		var branchId = branchObj.branchId
		var cardNo = $scope.cardNo
		$http.get("http://localhost:8070/lms/borrower/readBookCopies", 
				{ params: {
					    	branchId : branchId
					}
				}).success(function(data){
					$scope.copies = null;
					$scope.checkOutCopies = data;
					//$scope.numOfCheckOutBooks = data.length;
					console.log(data)
			});
	};
	
	$scope.userReturn = function(bc) {
		var branch = bc.branch
		var book = bc.book
		var borrower = {
				cardNo : $scope.cardNo
		}
		var loan = {
				book : book,
				branch : branch,
				borrower : borrower
		}
		$http.post("http://localhost:8070/lms/borrower/returnBook", loan).success(function(data){})
		alert("Book Returned Sucessfully")
	};
	
	$scope.userCheckOut = function(bc) {
		var branch = bc.branch
		var book = bc.book
		var borrower = {
				cardNo : $scope.cardNo
		}
		var loan = {
				book : book,
				branch : branch,
				borrower : borrower
		}
		$http.post("http://localhost:8070/lms/borrower/checkOutBook", loan).success(function(data){})
		alert("Book Checked Out Sucessfully")
	};
})