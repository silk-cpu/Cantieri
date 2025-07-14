package it.fila1.cantieri.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DipendentiDtoUpdator {
	
	
	private String nome;
	
	private String cognome;
	
	private String data_nascita;
	
	private String nazionalità;
	
	private String codice_fiscale;
	
	private String sesso;
	
	private Long fkAzienda;
}
