package it.fila1.cantieri.dto;

import java.util.List;

import it.fila1.cantieri.entities.Azienda;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class CantiereDtoUpdator {
	
	private String nome;
	
	private String committente;
	
	private int cap;
	
	private String nazione;
	
	private String data_inizio_cantiere;
	
	private String data_fine_cantiere;
	
	private String email;
	
	private String logo;
	
	private String pdf;
	
	private String firma;

	private List<Azienda> azienda;
	
}
