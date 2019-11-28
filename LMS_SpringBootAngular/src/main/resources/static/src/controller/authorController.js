lmsApp.controller("authorController", function($scope, $http, $window, lmsConstants, Pagination) {
	$http.get(lmsConstants.URL_PREFIX + "/readAuthorsWithBooks?searchString=").success(function(data) {
		$scope.authors = data;
		$scope.numOfAuthors = data.length;
		
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil($scope.authors.length
				/ $scope.pagination.perPage);
	})
	
	$scope.createAuthor = function(){
		var author = {
				authorName : $scope.authorName
		}
		author = JSON.stringify(author)
		console.log(author)
		$http.post(lmsConstants.URL_PREFIX + "/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
	$scope.updateAuthor = function(){
		var authorObj = JSON.parse($scope.thisAuthor)
		var author = {
				authorId : authorObj['authorId'],
				authorName : $scope.newName
		}
		$http.post(lmsConstants.URL_PREFIX + "/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
	$scope.deleteAuthor = function(){
		var authorObj = JSON.parse($scope.thisAuthor)
		var author = {
				authorId : authorObj['authorId']
		}
		$http.post(lmsConstants.URL_PREFIX + "/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
	$scope.cancelCreate = function(){
		$window.location = "#/author";
	};
	
})