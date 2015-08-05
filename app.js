var app = angular.module('flapperNews', ['ui.router'])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
		  url: '/posts/{id}',
		  templateUrl: '/posts.html',
		  controller: 'PostsCtrl'
		})

  $urlRouterProvider.otherwise('home')
}])

app.factory('posts', [function(){
  return [
		{title: 'post 1', upvotes: 5},
	  {title: 'post 2', upvotes: 2},
	  {title: 'post 3', upvotes: 15},
	  {title: 'post 4', upvotes: 9},
	  {title: 'post 5', upvotes: 4}
	]
}])

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope,posts){
  $scope.posts = posts
	$scope.addPost = function(){
		if(!$scope.title || $scope.title === '') { return }
	  $scope.posts.push({
	  	title: $scope.title, 
	  	link: $scope.link,
	  	upvotes: 0,
	  	comments: []
	  })
	  $scope.title = ''
	  $scope.link = ''
	}
	$scope.incrementUpvotes = function(post) {
	  post.upvotes++
	}
}])

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
	$scope.post = posts[$stateParams.id]
	$scope.addComment = function(){
	  if(!$scope.body || $scope.body === '') { return }
	  if(!$scope.post.comments) $scope.post.comments = []
	  $scope.post.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = ''
	}
	$scope.incrementUpvotes = function(comment) {
	  comment.upvotes++
	}
}])