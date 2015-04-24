//js/todoList.js
'use strict';


/**
 * Déclaration de l'application demoApp
 */
var tutureApp = angular.module('tutureApp', []);


tutureApp.controller('homeCtrl', function ($scope,$http, $log, $window) {
	var runner = setInterval(function () {$scope.computRun()}, 200);
	// http://www.racingcircuits.info/
	$scope.listeCircuits= {
			Spa_Francorchamps: {
				distance: 7004,
				difficulte: 6
			},
			Road_America: {
				distance: 6514,
				difficulte: 4
			},
			Bathurst_Mount_Panorama: {
				distance: 6213,
				difficulte: 5
			},
			Le_Mans: {
				distance: 13629,
				difficulte: 7
			},
			Nurburgring: {
				distance: 5148,
				difficulte: 8
			},
			Brends_Hatch: {
				distance: 3916,
				difficulte: 3
			},
			Laguna_Seca: {
				distance: 3602,
				difficulte: 5
			},
			Macau_Guia: {
				distance: 6115,
				difficulte: 7
			},
			Indianapolis_Motor_Speedway: {
				distance: 4023,
				difficulte: 2
			},
			Monte_Carlo: {
				distance: 3340,
				difficulte: 9
			},
	}

	$scope.circuits = [
	                   'Spa_Francorchamps',
	                   'Road_America',
	                   'Bathurst_Mount_Panorama',
	                   'Le_Mans',
	                   'Nurburgring',
	                   'Brends_Hatch',
	                   'Laguna_Seca',
	                   'Macau_Guia',
	                   'Indianapolis_Motor_Speedway',
	                   'Monte_Carlo'
	                   ];
	
	$scope.meteos = [
	                 'Ensoleillé',
	                 'Pluie',
	                 'Neige',
	                 'Glace'
	                 ];
	
	$scope.listeMoteurs = {};
	$scope.moteurs = [
	                  'V6',
	                  'V8',
	                  'v10',
	                  'v12',
	                  'w12',
	                  'w16'
	                  ];
	
	$scope.puissances = [
	                  '90ch',
	                  '110ch',
	                  '130ch',
	                  '150ch',
	                  '180ch',
	                  '220ch',
	                  '250ch',
	                  '280ch'
	                  ];

	$scope.currentCircuitName = '';
	$scope.currentCircuit = {
			distance: 0,
			difficulte: 0};

	$scope.listeVoitures = {
			v1: {
				index: 1,
				run: false,
				modele: ' ',
				vitesse: 0,
				chrono: 0,
				progression: 0,
				chronoTour: 0,
				chronoBest: 0,
				compteurTop: 0,
				moteur: ' ',
				puissance: ' ',
				poid: 0
			},
			v2: {
				index: 2,
				run: false,
				modele: ' ',
				vitesse: 0,
				chrono: 0,	
				progression: 0,
				chronoTour: 0,
				chronoBest: 0,
				compteurTop: 0,
				moteur: ' ',
				puissance: ' ',
				poid: 0
			},
			v3: {
				index: 3,
				run: false,
				modele: ' ',
				vitesse: 0,
				chrono: 0,
				progression: 0,
				chronoTour: 0,
				chronoBest: 0,
				compteurTop: 0,
				moteur: ' ',
				puissance: ' ',
				poid: 0
			},
			v4: {
				index: 4,
				run: false,
				modele: ' ',
				vitesse: 0,
				chrono: 0,
				progression: 0,
				chronoTour: 0,
				chronoBest: 0,
				compteurTop: 0,
				moteur: ' ',
				puissance: ' ',
				poid: 0
			}
	};

	$scope.modeles = [
	                  'Citroen',
	                  'Golf4',
	                  'Lamborghini_Veneno',
	                  'PussyVagon',
	                  'Subaru'
	                  ];

	$scope.listeModeles = {
			Citroen: {
				vitesseMax: 180,
				acceleration: 2,
				adherance :  8,//indice d'adhérance des pneux entre 1 et 10 qui changera selon la meteo sur le circuit (voir aussi pour l'usure ..) 
			},
			Golf4: {
				vitesseMax: 195,
				acceleration: 2,
				adherance :  7
			},
			Lamborghini_Veneno: {
				vitesseMax: 188,
				acceleration: 3,
				adherance :  7
			},
			PussyVagon: {
				vitesseMax: 175,
				acceleration: 3,
				adherance :  6
			},
			Subaru: {
				vitesseMax: 217,
				acceleration: 4,
				adherance :  9
			},
	}

	$scope.setMeteo = function(meteo){
		
	}
	$scope.setCircuit = function(nom){
		if($scope.listeCircuits[nom]) {
			$scope.currentCircuit = $scope.listeCircuits[nom];
			localStorage.setItem("circuitName", nom);
			//var path = 'css/images/'+nom+'.png';
			document.getElementById("circuit_img").setAttribute("src",'css/images/'+nom+'.png');
		}else {
			document.getElementById("circuit_img").setAttribute("src",'css/images/circuit1.png');
		}
	}

	$scope.setModele = function(index, nom) {
		$scope.listeVoitures["v"+index].model = nom;
	}

	$scope.startVoiture = function(index) {
		//if($scope.listeVoitures["v"+index].modele === '') {
		//alert("Veuillez sélectionner un modèle !");
		//} else {
		$scope.listeVoitures["v"+index].run = true;
		//	}
	}

	$scope.stopVoiture = function(index) {
		$scope.listeVoitures["v"+index].run = false;
	}


	

	$scope.computRun = function() {	
		angular.forEach($scope.listeVoitures, function(voiture) {
			if(voiture.run){
				voiture.compteurTop = voiture.compteurTop+ 1;
				if(voiture.compteurTop > 4) {
					voiture.compteurTop = 0;
					$scope.incrementChronos(voiture);
				}
				if(voiture.vitesse < $scope.listeModeles[voiture.modele].vitesseMax) {
					$scope.accelerer(voiture);
				}
				$scope.setProg(voiture); 
			}
			/*else {
				if(voiture.vitesse > 0) {
					$scope.decelerer(voiture);
				}
			} */
		});
	}

	$scope.incrementChronos = function(voiture){
		voiture.chrono = voiture.chrono + 1;
		document.getElementById('voitureChr'+voiture.index).innerHTML =  $scope.getTimerLabel(voiture.chrono);
		voiture.chronoTour = voiture.chronoTour + 1;
		document.getElementById('voitureChrT'+voiture.index).innerHTML =  $scope.getTimerLabel(voiture.chronoTour);
	}
	
	$scope.getChrono = function(index){
		var chronoLabel = $scope.getTimerLabel($scope.listeVoitures["v"+index].chrono);
		return chronoLabel;
	}
	
	$scope.getChronoTour = function(index){
		var chronoLabel = $scope.getTimerLabel($scope.listeVoitures["v"+index].chronoTour);
		return chronoLabel;
	}
	
	$scope.getChronoBest = function(index){
		var chronoLabel = $scope.getTimerLabel($scope.listeVoitures["v"+index].chronoBest);
		return chronoLabel;
	}
	
	$scope.getTimerLabel = function(intTime) {
		var time = new Date(intTime*1000);
		var sec = time.getSeconds();
		var min = time.getMinutes();
		var hr = time.getHours()-1;
		if (min < 10){
			min = "0" + min;
		}
		if (sec < 10){
			sec = "0" + sec;
		}
		if(hr < 10){
			hr = "0" + hr;
		}
		return hr + ":" + min + ":" + sec;
	}
	
	$scope.accelerer = function(voiture) {
		voiture.vitesse = (voiture.vitesse + $scope.listeModeles[voiture.modele].acceleration < $scope.listeModeles[voiture.modele].vitesseMax) ? voiture.vitesse + $scope.listeModeles[voiture.modele].acceleration : $scope.listeModeles[voiture.modele].vitesseMax;
		document.getElementById('voitureVit'+voiture.index).innerHTML = voiture.vitesse;
	};

	/*$scope.decelerer = function(voiture) {
		voiture.vitesse = (voiture.vitesse - $scope.listeModeles[voiture.modele].acceleration) < 0 ? 0 : voiture.vitesse - $scope.listeModeles[voiture.modele].acceleration;
		document.getElementById('voitureVit'+voiture.index).innerHTML = voiture.vitesse;
	};*/

	$scope.setProg = function(voiture) {
		var distanceSup = Math.round(((voiture.vitesse/3600)*1000)/5);
		voiture.progression = voiture.progression + distanceSup;
		if(voiture.progression >= $scope.listeCircuits[localStorage.getItem("circuitName")].distance) {
			voiture.progression = voiture.progression - $scope.listeCircuits[localStorage.getItem("circuitName")].distance;
			voiture.chronoTour = voiture.chronoTour - Math.round((voiture.progression/((voiture.vitesse/3600)*1000)));
			$scope.compareScoreTemps(voiture);
			voiture.chronoTour = Math.round(voiture.progression/((voiture.vitesse/3600)*1000));
			document.getElementById('voitureChrT'+voiture.index).innerHTML = $scope.getTimerLabel(voiture.chronoTour);
		}
		document.getElementById('voitureProg'+voiture.index).innerHTML = voiture.progression;
	}
	
	$scope.compareScoreTemps = function(voiture) {
		if(voiture.chronoBest === 0 || (voiture.chronoTour < voiture.chronoBest)){
			voiture.chronoBest = voiture.chronoTour;
			document.getElementById('voitureChrB'+voiture.index).innerHTML = $scope.getTimerLabel(voiture.chronoBest);
		}
	}
	
	$scope.isCircuitSelected = function() {
		if(localStorage.getItem("circuitName")) {
			return true;
		} else {
			return false;
		}
	}

	$scope.onloadPage = function () {
		localStorage.removeItem("circuitName");
	}
	
	$scope.reset = function() {
		$window.location.reload();
	}

});

