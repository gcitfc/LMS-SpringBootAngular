lmsApp.config(["$routeProvider", function($routeProvider){
	return $routeProvider.when("/",{
		redirectTo: "home"
	}).when("/home",{
		templateUrl: "home.html"
	}).when("/admin", {
		templateUrl: "admin.html"
	}).when("/book", {
		templateUrl: "book.html"
	}).when("/newBook", {
		templateUrl: "newBook.html"
	}).when("/editBook", {
		templateUrl: "editBook.html"
	}).when("/author", {
		templateUrl: "author.html"
	})
}])