package it.fila1.cantieri.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class AziendaDtoUpdator {
	
	private String ragione_sociale;
	
	private String natura_giuridica;
	
	private int piva;
	
	private String codice_ateco;
	
	private String indirizzo;
	
	private String mappa;
	
	private String email;
	
	private Long fk_cantiere;

}
