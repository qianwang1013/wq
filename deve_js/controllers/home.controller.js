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
		$scope.url = [];
		$scope.path_type = '';	
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
			}else{
				$scope.path = '';
			}

			var request = $http({
			    method: 'post',
			    url: 'server/create.php',
			    data: {
					headline: $scope.headline,
					notes: $scope.notes,
					content: $scope.content,
					path: $scope.path
			    },
			    headers: { 'Content-Type': 'application/json' }
			});

			
			request.success(function(data){
				if($scope.file){
					toastr.info('Starting uploading');
					upload();				
					toastr.success('Finish uploading');
					$scope.file = null;
				}
				else{
					toastr.info('No file Selected');
				}

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

			var request = $http({
			    method: 'post',
			    url: 'server/sendMail.php',
			    data: {
					name: $scope.name,
					message: $scope.req_content
			    },
			    headers: { 'Content-Type': 'application/json' }
			});

			request.success(function(data){

				toastr.info(data);
				$scope.req_content = '';
			});
		};

		$scope.getFile = function(path){
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
					console.log('url: ' + url);
					var name = path.substring(0, path.lastIndexOf('.'));
/*					$scope.url = $sce.trustAsResourceUrl(url);
					console.log('sce: ' + $scope.url);*/
					$scope.url[path] = {
						url: $sce.trustAsResourceUrl(url)
					};
					$scope.path_type = getType(path);
					console.log($scope.url);
					toastr.success($scope.path_type +  ' loaded');
				}
			});
		};

		$scope.leaveMessage = function(){

			var request = $http({
			    method: 'post',
			    url: 'server/leaveMessage.php',
			    data: {
					name: $scope.name,
					message: $scope.mess_content
			    },
			    headers: { 'Content-Type': 'application/json' }
			});

			request.success(function(data){
				toastr.success(data);
				$scope.mess_content = '';
			});
		};

		$scope.getMessage = function(){
			$http.get('server/getMessage.php').success(function(data){
				$scope.message = data;
				console.log($scope.message[0].name);
				if($scope.message[0].name == null){
					$scope.noMessage = true;
				}else{
					$scope.noMessage = false;					
				}
			});
		};

		var getType = function(path){
			console.log('path: ' + path);
	        var ext = path.substring(path.lastIndexOf('.'), path.length);
			var path_type = '';
			switch(ext){
	           case '.mp4':
      		   case '.ogg':
               case '.webm':
             		path_type = 'video';
             		break;
               case '.jpg':
               case '.png':
               		path_type = 'img';
               		break;
               default:
               		path_type = '';		
			}
			console.log('path_type: ' + path_type);
			return path_type;
		}
	}
]);

