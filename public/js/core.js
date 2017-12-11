var scotchTodo = angular.module('scotchTodo', []);
var faceData = [];
function mainController($scope, $http, $sce, $location, $anchorScroll) {
	$scope.formData = {};
	
	$scope.imageJson;
	$scope.image;
	$scope.image_keywordsJson;
	$scope.image_keywords;
	$scope.imageFaceTagsJson;
	$scope.imageFaceTags;

	$scope.showResultsText = false;
	$scope.showResultsVisual = false;
	$scope.showProgress = false;

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$scope.showResultsText = false;
		$scope.showResultsVisual = false;
		$scope.showProgress = true;
		if($scope.formData) {
			if($scope.formData.text == undefined){
				$scope.formData = {text: document.getElementById("imageT").src};
			} else if($scope.formData.text == ''){
				$scope.formData = {text: document.getElementById("imageT").src};
			}
		}
		console.log($scope.formData);
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {text: data.image.url}; // clear the form so our user is ready to enter another
				if(data.image){
					$scope.imageJson = $scope.parseJSONData(data.image);
					$scope.image = data.image.response.image;
				}
				if(data.image_keywords){
					$scope.image_keywordsJson = $scope.parseJSONData(data.image_keywords);
					$scope.image_keywords = data.image_keywords.response.imageKeywords;
				}
				if(data.imageFaceTags){
					$scope.imageFaceTagsJson = $scope.parseJSONData(data.imageFaceTags);
					$scope.imageFaceTags = data.imageFaceTags.response.imageFaces;
					/*var count = 0;
					for(var count $scope.imageFaceTags) {
						count = count+1;
						console.log(fTag.gender.gender);
					}*/
					tagTheImages($scope.imageFaceTags);
				}
				$scope.showResultsText = true;
				$scope.showProgress = false;
				$location.hash('searchinput');
				$anchorScroll();
				$(".faceTab").click();
				$(".visulaTab").click();
			})
			.error(function(data) {
				console.log('Error: ' + data);
				//myApp.hidePleaseWait();
			});
	};
	// Parse JSON data into 
	$scope.parseJSONData = function(response) {
		var results1 = JSON.stringify(response, undefined, 2),
			results2 = results1.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
	    return $sce.trustAsHtml(results2);//results2;
	};
}
