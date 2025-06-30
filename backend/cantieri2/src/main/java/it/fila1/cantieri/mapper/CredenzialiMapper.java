package it.fila1.cantieri.mapper;

import it.fila1.cantieri.dto.CredenzialiDto;
import it.fila1.cantieri.entities.Credenziali;

public class CredenzialiMapper {
	public static Credenziali dtoToEntity(CredenzialiDto credenzialiDto) {
		Credenziali credenziali = new Credenziali();
		credenziali.setUser(credenzialiDto.getUser());
		credenziali.setPassword(credenzialiDto.getPassword());
		return credenziali;
	}
}
