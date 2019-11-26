lmsApp.controller("publisherController", function($scope, $http, $window, lmsConstants, Pagination) {
	$http.get(lmsConstants.URL_PREFIX+"/readPublishers?searchString=").success(function(data) {
		$scope.publishers = data;
		$scope.numOfPublishers = data.length;
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil($scope.publishers.length
				/ $scope.pagination.perPage);
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/publisher";
	};
	
	$scope.createPublisher = function(){
		if($scope.publisherName == null || $scope.address == null || $scope.phone == null) {
			alert("Input(s) Required")
			return
		}
		
		var publisher = {
				pubId : null,
				pubName : $scope.publisherName,
				pubAddress : $scope.address,
				pubPhone : $scope.phone
		}
		console.log(publisher)
		$http.post(lmsConstants.URL_PREFIX+"/updatePublisher", JSON.stringify(publisher)).success(function(data){})
		$window.location = "#/publisher";
	};
	
	$scope.updatePublisher = function(){
		if($scope.thisPublisher == null) {
			alert("Input(s) Required")
			return
		}
		var obj = JSON.parse($scope.thisPublisher)
		var pubId = obj.pubId
		var newName = obj.pubName
		var newAddress = obj.pubAddress
		var newPhone = obj.pubPhone
		if($scope.newName != null)
			newName = $scope.newName
		if($scope.newAddress != null)
			newAddress = $scope.newAddress
		if($scope.newPhone != null)
			newPhone = $scope.newPhone
		var publisher = {
				pubId : pubId,
				pubName : newName,
				pubAddress : newAddress,
				pubPhone : newPhone
		}
		console.log(publisher)
		$http.post(lmsConstants.URL_PREFIX+"/updatePublisher", JSON.stringify(publisher)).success(function(data){
			
		})
		$window.location = "#/publisher";
	};
	
	$scope.deletePublisher = function(){
		if($scope.thisPublisher == null) {
			alert("Input(s) Required")
			return
		}
		var obj = JSON.parse($scope.thisPublisher)
		var publisher = {
				pubId : obj.pubId
		}
		$http.post(lmsConstants.URL_PREFIX+"/updatePublisher", JSON.stringify(publisher)).success(function(data){})
		$window.location = "#/publisher";
	};
	
	
	
})