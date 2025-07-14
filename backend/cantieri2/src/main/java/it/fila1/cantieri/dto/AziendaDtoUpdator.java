package it.fila1.cantieri.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class AziendaDtoUpdator {
	
	private String ragione_sociale;
	
	private String natura_giuridica;
	
	private long piva;
	
	private String codice_ateco;
	
	private String indirizzo;
	
	private String citta;
	
	private String stato;
	
	private String nazione;
	
	private String mappa;
	
	private String email;
	
	private Long fk_cantiere;
	
	private List<DipendentiDto> dipendenti;

}
