var controllers = angular.module('slingcontrol',[]);

controllers.controller('MainCtrl',function($scope, $http){
	var url ='http://localhost:3000/api/bags?callback=JSON_CALLBACK';
 	$http.jsonp(url).then(function(response){
 		$scope.bagsList = response.data;
 		console.log(response.data);
 	});
});