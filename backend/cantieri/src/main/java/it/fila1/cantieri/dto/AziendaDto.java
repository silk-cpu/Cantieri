package it.fila1.cantieri.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor


public class AziendaDto {
	
	@NotNull
	private String ragione_sociale;
	@NotNull
	private String natura_giuridica;
	@NotNull
	private long piva;
	@NotNull
	private String codice_ateco;
	@NotNull
	private String indirizzo;
	@NotNull
	private String mappa;
	@NotNull
	private String email;
	@NotNull
	private Long fk_cantiere;
		
}
