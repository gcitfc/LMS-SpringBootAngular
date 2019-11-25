lmsApp.controller("genreController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/readGenres?searchString=").success(function(data) {
		$scope.genres = data;
		$scope.numOfGenres = data.length;
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/genre";
	};
	
	$scope.createGenre = function(){
		var genre = {
				genreName : $scope.genreName
		}
		
		$http.post("http://localhost:8070/lms/updateGenre", JSON.stringify(genre)).success(function(data){
			
		})
		$window.location = "#/genre";
	};
	
	$scope.updateGenre = function(){
		var genreObj = JSON.parse($scope.thisGenre)
		var newName = genreObj.genreName
		if($scope.newName != null)
			newName = $scope.newName
		var genre = {
				genreId : genreObj.genreId,
				genreName : newName
		}
		$http.post("http://localhost:8070/lms/updateGenre", JSON.stringify(genre)).success(function(data){
			
		})
		$window.location = "#/genre";
	};
	
	$scope.deleteGenre = function(){
		var genreObj = JSON.parse($scope.thisGenre)
		var genre = {
				genreId : genreObj.genreId,
				genreName : null,
				books : null
		}
		$http.post("http://localhost:8070/lms/updateGenre", JSON.stringify(genre)).success(function(data){})
		$window.location = "#/genre";
	};
	
	
	
})