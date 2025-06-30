package it.fila1.cantieri.dto;

import java.util.List;

import it.fila1.cantieri.entities.Azienda;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class CredenzialiDto {
	
	private String user;
	
	private String password;
}
