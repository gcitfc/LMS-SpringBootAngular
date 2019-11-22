lmsApp.controller("authorController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/admin/readAuthorsByName?searchString=").success(function(data) {
		$scope.authors = data;
		$scope.numOfAuthors = data.length;
	})
	
	$scope.createAuthor = function(){
		var author = {
				authorName : ""
		}
		$http.post("http://localhost:8070/lms/admin/updateAuthor", author).success(function(data){
			
		})
		$window.location = "#/author";
	};
	
})