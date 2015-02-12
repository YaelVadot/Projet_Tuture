// js/todoList.js
'use strict';


/**
 * Déclaration de l'application demoApp
 */
var tutureApp = angular.module('tutureApp', []);


tutureApp.controller('homeCtrl', function ($scope,$http, $log) {
	$scope.vitesseA = '0';
	$scope.addVoiture = function(id) {

	};
	
	$scope.startVoiture = function() {
		$scope.vitesseA = '12';
	};
	
});

