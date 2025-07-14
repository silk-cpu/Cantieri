package it.fila1.cantieri.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import it.fila1.cantieri.entities.Azienda;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DipendentiDto {
	@NotNull
	private String nome;
	@NotNull
	private String cognome;
	@NotNull
	private String data_nascita;
	@NotNull
	private String nazionalita;
	@NotNull
	private String codice_fiscale;
	@NotNull
	private String sesso;
	@NotNull
	private Long fkAzienda;
}
