lmsApp.controller("userController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/readBranches?searchString=").success(function(data) {
		$scope.branches = data;
		$scope.numOfBranches = data.length;
	})
	
	$http.get("http://localhost:8070/lms/readBorrowers?searchString=").success(function(data) {
		$scope.borrowers = data;
		$scope.numOfBorrowers = data.length;
	})
	
	$scope.returning = false
	
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
		$scope.returning = true
		var cardNo = $scope.cardNo	
		$http.get("http://localhost:8070/lms/readBooksByBB", 
				{ params: {
							cardNo : cardNo,
					    	branchId : branchId
					}
				}).success(function(data){
					$scope.checkOutCopies = null;
					$scope.copies = data;
					console.log(data)
			});
	};
	
	$scope.checkOutBook = function() {
		if($scope.cardNo == null || this.validCardNo($scope.cardNo) == false) {
			alert("Invalid Card Number")
			return
		}
		$scope.returning = false
		var branchObj = JSON.parse($scope.thisBranch)
		var branchId = branchObj.branchId
		var cardNo = $scope.cardNo
		$http.get("http://localhost:8070/lms/readAvailableBookCopies", 
				{ params: {
					    	branchId : branchId
					}
				}).success(function(data){
					$scope.copies = null;
					$scope.checkOutCopies = data;
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
		$http.post("http://localhost:8070/lms/returnBook", loan).success(function(data){})
		alert("Book Returned Sucessfully")
	};
	
	$scope.userCheckOut = function(bc) {
		var branch = bc.branch
		var book = bc.book
		
		$http.get("http://localhost:8070/lms/readBooksByBB", 
				{ params: {
							cardNo : cardNo,
					    	branchId : branch.branchId
					}
				}).success(function(data){
					$scope.tmpList = data
			});
		
//		var tmp = $scope.tmpList
//		console.log(tmp)
//		
//		for(var index = 0; index < tmp.length; index++){
//			if(tmp[index].book.bookId == book.bookId) {
//				alert("You have already checked out one copy of this book")
//				return
//			}
//		}
		
		var borrower = {
				cardNo : $scope.cardNo
		}
		var loan = {
				book : book,
				branch : branch,
				borrower : borrower
		}
		$http.post("http://localhost:8070/lms/checkOutBook", loan).success(function(data){})
		alert("Book Checked Out Sucessfully")
	};
	
	
})