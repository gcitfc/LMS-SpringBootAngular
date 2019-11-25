lmsApp.controller("authorController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/readAuthorsWithBooks?searchString=").success(function(data) {
		$scope.authors = data;
		$scope.numOfAuthors = data.length;
	})
	
	$scope.createAuthor = function(){
		var author = {
				authorName : $scope.authorName
		}
		author = JSON.stringify(author)
		console.log(author)
		$http.post("http://localhost:8070/lms/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
	$scope.updateAuthor = function(){
		var authorObj = JSON.parse($scope.thisAuthor)
		var author = {
				authorId : authorObj['authorId'],
				authorName : $scope.newName
		}
		$http.post("http://localhost:8070/lms/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
	$scope.deleteAuthor = function(){
		var authorObj = JSON.parse($scope.thisAuthor)
		var author = {
				authorId : authorObj['authorId']
		}
		$http.post("http://localhost:8070/lms/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
	$scope.cancelCreate = function(){
		$window.location = "#/author";
	};
	
})