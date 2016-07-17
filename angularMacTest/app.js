var app = angular.module("app", ["smart-table"]);
	app.controller("firstController", function ($scope,FirstService) {
        $scope.username = "Pratik";
        $scope.address = "Delhi, India";
		function responseS(response){
			oStringify = JSON.stringify(response.data);
			swal("Posted Sucessfully",oStringify,"success");
		};
		function responseF(response){
			oStringify = JSON.stringify(response.data);
			swal("Posting failed",oStringify,"error");
		};
		$scope.getData = [];
        $scope.reset = function(){
			$scope.student.firstName = "";
			$scope.student.lastName = "";
		}
		
		function responseG(response){
			$scope.getData = response.data;
		};
		$scope.submit = function(form){
			FirstService.post(form,responseS,responseF);
		} 
		FirstService.get(responseG,responseF);
    });

    app.directive('exampleText', function () {
		//directive name in html will be example-text 
        return {
			restrict: "E",
            template: ' Created By: {{ username }}, Address: {{ address }}'
        };
    }); 
	app.service('FirstService', ["HTTPConnection", function(HTTPConnection) {
		var url = "http://jsonplaceholder.typicode.com/posts/";
	this.post = function(data, success, failure) {
		console.log(data);
		HTTPConnection.post(url, data, success,failure);
	}
	this.get = function(success, failure) {
		HTTPConnection.get(url,success,failure);
	}
}]);

app.service('HTTPConnection', ['$http', '$q',function($http, $q) {
	this.post = function(url, data, success, failure){
		// $http returns a promise, which has a then function, which also returns a promise
		var deferred = $q.defer();
		var options = {
	            headers: {},
	        };
		var promise = $http.post(url, data, options).then(function (response) {
			success(response, deferred);
		}, function(response) {
			if(failure) {
				failure(response, deferred);
			} 
		}).catch(function(e) {
        });
		return deferred.promise;
	};
	
	this.get = function(url, success, failure){
		var deferred = $q.defer();
		var promise = $http.get(url).then(function (response) {
			success(response, deferred);
		}, function(response) {
			if(failure) {
				failure(response, deferred);
			} 
			}).catch(function(e) {
        });
		return deferred.promise;
	};
}]);