package it.fila1.cantieri.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor


public class AziendaDto {
	
	private String ragione_sociale;
	
	private String natura_giuridica;
	
	private int piva;
	
	private String codice_ateco;
	
	private String indirizzo;
	
	private String mappa;
	
	private String email;
		
}
