package it.fila1.cantieri.dto;

import java.util.List;

import it.fila1.cantieri.entities.Azienda;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class CantiereDto {
	
	@NotNull
	private String nome;
	@NotNull
	private String committente;
	@NotEmpty
	private int cap;
	@NotNull
	private String nazione;
	@NotNull
	private String data_inizio_cantiere;
	@NotNull
	private String data_fine_cantiere;
	@NotNull
	private String email;
	@NotNull
	private String logo;
	@NotNull
	private String pdf;
	@NotNull
	private String firma;
	@NotNull
	private List<AziendaDto> azienda;
	
}
