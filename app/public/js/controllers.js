var controllers = angular.module('slingcontrol', []);

controllers.controller('MainCtrl', function($scope, $http){
	$scope.loading = true;
	$scope.bagsCount = 'Loading...';
	var url ='http://localhost:3000/api/bags?callback=JSON_CALLBACK';
 	$http.jsonp(url).then(function(response){
 		$scope.loading = false;
 		$scope.bagsList = response.data;
 		$scope.bagsCount = 'Bags in stock: ' + response.data.length;
 	});
});