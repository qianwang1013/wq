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
			   		/* jshint ignore:start */
			   		toastr.success('Successfully logged in as: ' + $scope.name);
			   		/* jshint ignore:end */	
					$location.path('/');
					$scope.ifLog = true;
					$scope.req_name = $scope.name;
			   }
			   else{
			   		toastr.error('The username and password you entered are invalid \n Send in a request if this keeps happening');
			   		$scope.ifLog = false;
			   }
			});	
		};

		$scope.signout = function(){
			toastr.success($scope.name + ' has just signed out');
			$scope.ifLog = false;
			$scope.name = '';
			$scope.req_name = '';
			$scope.pass = '';
		};


		$scope.find = function(){
			$http.get('server/find.php').success(function(data){
				$scope.events = data;
				toastr.info('All events loaded');
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

				toastr.info(data);
				$scope.req_name = '';
				$scope.req_email = '';
				$scope.req_content = '';
			});
		};
	}
]);