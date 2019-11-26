lmsApp.controller("genreController", function($scope, $http, $window, lmsConstants, Pagination) {
	$http.get(lmsConstants.URL_PREFIX + "/readGenres?searchString=").success(function(data) {
		$scope.genres = data;
		$scope.numOfGenres = data.length;
		
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil($scope.genres.length
				/ $scope.pagination.perPage);
	})
	
	$scope.cancelCreate = function(){
		$window.location = "#/genre";
	};
	
	$scope.createGenre = function(){
		var genre = {
				genreName : $scope.genreName
		}
		
		$http.post(lmsConstants.URL_PREFIX + "/updateGenre", JSON.stringify(genre)).success(function(data){
			
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
		$http.post(lmsConstants.URL_PREFIX + "/updateGenre", JSON.stringify(genre)).success(function(data){
			
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
		$http.post(lmsConstants.URL_PREFIX + "/updateGenre", JSON.stringify(genre)).success(function(data){})
		$window.location = "#/genre";
	};
	
	
	
})