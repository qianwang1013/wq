'use strict';
wqian.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
});

wqian.controller('Home',['$scope', '$http', '$location', '$sce',
	function($scope, $http, $location, $sce){
		$scope.ifLog = false;
		$scope.url = "";
		var upload = function() {
			/* jshint ignore:start */
		  // Configure The S3 Object 
		  AWS.config.update({ accessKeyId: amazon_credentials.aws_access_key_id, secretAccessKey: amazon_credentials.aws_secret_access_key });
		  AWS.config.region = 'us-east-1';
		  var bucket = new AWS.S3({ params: { Bucket: amazon_credentials.bucket } });
		 
		  if($scope.file) {
		    var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
		 
		    bucket.putObject(params, function(err, data) {
		      if(err) {
		        // There Was An Error With Your S3 Config
		        toastr.error(err.message);
		        return false;
		      }
		      else {
		        // Success!
		        toastr.success('Upload Done');
		      }
		    })
		  }
		  else {
		    // No File Selected
		    toastr.error('No File Selected');
		  }
		  				/* jshint ignore:end */	
		};
		$scope.create = function(){
			if($scope.file){
				$scope.path = $scope.file.name;
			}
			var event = {
				headline: $scope.headline,
				notes: $scope.notes,
				content: $scope.content,
				path: $scope.path
			};

			$http.put('server/create.php', event, { 'Content-Type': 'application/json' }).success(function(data){
				upload();
				alert(data);
				$scope.headline = '';
				$scope.notes = '';
				$scope.content = '';
				$scope.path = '';
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

		$scope.getFile = function(path){
			console.log(path);
		 	 AWS.config.update({ accessKeyId: amazon_credentials.aws_access_key_id, secretAccessKey: amazon_credentials.aws_secret_access_key });
		 	 AWS.config.region = 'us-east-1';
		 	 var s3 = new AWS.S3();
			var params = {Bucket: amazon_credentials.bucket, Key: path};
			s3.getSignedUrl('getObject', params, function (err, url) {
				if(err){
					toastr.error(err);
				}
				else{
/*					toastr.success('');*/
					$scope.url =   $sce.trustAsResourceUrl(url);
				}
			});
		};
	}
]);

