lmsApp.controller("bookController", function($scope, $http, $window, lmsConstants, Pagination) {
	$http.get(lmsConstants.URL_PREFIX + "/readBooks?searchString=").success(function(data) {
		$scope.books = data;
		$scope.numOfBooks = data.length;
		
		$scope.pagination = Pagination.getNew(10);
		$scope.pagination.numPages = Math.ceil($scope.books.length
				/ $scope.pagination.perPage);
	})
	
	$http.get(lmsConstants.URL_PREFIX+"/readAuthors?searchString=").success(function(data) {
		$scope.authors = data;
	})
	
	$http.get(lmsConstants.URL_PREFIX+"/readPublishers?searchString=").success(function(data) {
		$scope.publishers = data;
	})
	
	$http.get(lmsConstants.URL_PREFIX+"/readGenres?searchString=").success(function(data) {
		$scope.genres = data;
	})
	
	$scope.createBook = function(){
		var authorArray = []
		var tmp = $scope.bookAuthors
		console.log(JSON.parse(tmp[0]))
		for (var i = 0, len = tmp.length; i < len; i++) {
		    authorArray.push(JSON.parse(tmp[i]))
		}
		
		var genreArray = []
		var tmp = $scope.bookGenres
		console.log(JSON.parse(tmp[0]))
		for (var i = 0, len = tmp.length; i < len; i++) {
			genreArray.push(JSON.parse(tmp[i]))
		}

		var book = {
				title : $scope.bookTitle,
				authors : authorArray,
				genres : genreArray,
				publisher: JSON.parse($scope.bookPublisher)
		}
		
		$http.post(lmsConstants.URL_PREFIX+"/saveBook", book).success(function(data){
			
		})
		$window.location = "#/book";
	};
	
	$scope.cancelCreate = function(){
		$window.location = "#/book";
	};
	
	$scope.updateBook = function(){
		var authorArray = null
		var genreArray = null
		var newPublisher = null
		var bookObj = JSON.parse($scope.bookTitle)
		var newTitle = bookObj['title']
		
		if($scope.bookAuthors != null) {
			var authorArray = []
			var tmp = $scope.bookAuthors
			for (var i = 0, len = tmp.length; i < len; i++) {
			    authorArray.push(JSON.parse(tmp[i]))
			}
		}
		
		if($scope.bookGenres != null) {
			var genreArray = []
			var tmp = $scope.bookGenres
			for (var i = 0, len = tmp.length; i < len; i++) {
				genreArray.push(JSON.parse(tmp[i]))
			}
		}
		
		if($scope.newTitle != null)
			newTitle = $scope.newTitle
			
		if($scope.bookPublisher != null)
			newPublisher = JSON.parse($scope.bookPublisher)
		
		var book = {
				bookId : bookObj['bookId'],
				title : newTitle,
				authors : authorArray,
				genres : genreArray,
				publisher: newPublisher
		}
		//alert(authorArray)
		
		$http.post(lmsConstants.URL_PREFIX+"s/updateBook", book).success(function(data){})
		$window.location = "#/book";
	};
	
	$scope.deleteBook = function(){
		var bookObj = JSON.parse($scope.bookTitle)
		
		var book = {
				bookId : bookObj['bookId']
		}
		//alert(authorArray)
		
		$http.post(lmsConstants.URL_PREFIX+"/updateBook", book).success(function(data){})
		$window.location = "#/book";
	};
	
})