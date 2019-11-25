lmsApp.controller("bookController", function($scope, $http, $window) {
	$http.get("http://localhost:8070/lms/readBooks?searchString=").success(function(data) {
		$scope.books = data;
		$scope.numOfBooks = data.length;
	})
	
	$http.get("http://localhost:8070/lms/readAuthors?searchString=").success(function(data) {
		$scope.authors = data;
	})
	
	$http.get("http://localhost:8070/lms/readPublishers?searchString=").success(function(data) {
		$scope.publishers = data;
	})
	
	$http.get("http://localhost:8070/lms/readGenres?searchString=").success(function(data) {
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
		
		$http.post("http://localhost:8070/lms/saveBook", book).success(function(data){
			
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
		
		$http.post("http://localhost:8070/lms/updateBook", book).success(function(data){})
		$window.location = "#/book";
	};
	
	$scope.deleteBook = function(){
		var bookObj = JSON.parse($scope.bookTitle)
		
		var book = {
				bookId : bookObj['bookId']
		}
		//alert(authorArray)
		
		$http.post("http://localhost:8070/lms/updateBook", book).success(function(data){})
		$window.location = "#/book";
	};
	
})