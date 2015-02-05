package model;

import java.util.Calendar;
import java.util.Date;

public class Voiture {
	// Classe objet pour les voitures
	
	//marque de la voiture
	public String marque;
	
	// model de la voiture.
	public String model;
	
	//date de lancement
	public Date dateLancement;
	
	/**
	 * Création d'un voiture en fonction de ça marque et de son model
	 * @param marque - marque de la voiture
	 * @param model - model de la voiture
	 */
	public Voiture(String marque, String model){
		this.marque = marque;
		this.model = model;
		//on initialise la date de lancement
		dateLancement = new Date(System.currentTimeMillis());
	}
	
	/**
	 * Retourne le model et la marque de la voiture
	 * Utilisé pour l'affichage (plus rapide)
	 */
	public String toString(){
		return model + " " + marque;
	}
}
