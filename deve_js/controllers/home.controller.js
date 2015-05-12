'use strict';

wqian.controller('Home',['$scope', '$http', '$location',
	function($scope, $http, $location){
		$scope.ifLog = false;
		$scope.create = function(){
			var event = {
				headline: $scope.headline,
				notes: $scope.notes,
				content: $scope.content
			};

			$http.put('server/create.php', event, { 'Content-Type': 'application/json' }).success(function(data){
				alert(data);
				$scope.headline = '';
				$scope.notes = '';
				$scope.content = '';
			});
		};
		$scope.signin =function(){
			var request = $http({
			    method: 'post',
			    url: 'server/database.php',
			    data: {
			        username: $scope.name,
			        password: $scope.pass
			    },
			    headers: { 'Content-Type': 'application/json' }
			});

			/* Check whether the HTTP Request is successful or not. */
			request.success(function (data) {
				console.log(data);
			   if(data.ifExist == true){
			   		alert('success');
					$location.path('/');
					$scope.ifLog = true;
					$scope.req_name = $scope.name;
			   }
			   else{
			   		$scope.ifLog = false;
			   		alert('false');
			   }
			});	
		};

		$scope.signout = function(){
			console.log('here');
			$scope.ifLog = false;
			$scope.name = '';
			$scope.req_name = '';
			$scope.pass = '';
		};


		$scope.find = function(){
			$http.get('server/find.php').success(function(data){
				$scope.events = data;
				console.log($scope.events);
			});
		};

		$scope.request = function(){
			var email = {
				req_name: $scope.req_name,
				req_email: $scope.req_email,
				req_content: $scope.req_content
			};

			$http.post('server/sendMail.php', email, { 'Content-Type': 'application/json' }).success(function(data){

				alert(data);
				$scope.req_name = '';
				$scope.req_email = '';
				$scope.req_content = '';
			});
		};
	}
]);