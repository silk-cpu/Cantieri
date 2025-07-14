package it.fila1.cantieri.mapper;

import it.fila1.cantieri.dto.DipendentiDto;
import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.entities.Dipendenti;

public class DipendentiMapper {
	public static Dipendenti dtoToEntity(DipendentiDto dipendentiDto,Azienda azienda) {
		Dipendenti dipendenti = new Dipendenti();
		
		
		dipendenti.setAzienda(azienda);
		dipendenti.setCodice_fiscale(dipendentiDto.getCodice_fiscale());
		dipendenti.setCognome(dipendentiDto.getCognome());
		dipendenti.setData_nascita(dipendentiDto.getData_nascita());
		dipendenti.setNome(dipendentiDto.getNome());
		dipendenti.setNazionalita(dipendentiDto.getNazionalita());
		dipendenti.setSesso(dipendentiDto.getSesso());
		
		return dipendenti;
	}
	
	public static Dipendenti dtoToEntity(DipendentiDto dipendentiDto) {
		Dipendenti dipendenti = new Dipendenti();
		
		dipendenti.setCodice_fiscale(dipendentiDto.getCodice_fiscale());
		dipendenti.setCognome(dipendentiDto.getCognome());
		dipendenti.setData_nascita(dipendentiDto.getData_nascita());
		dipendenti.setNome(dipendentiDto.getNome());
		dipendenti.setNazionalita(dipendentiDto.getNazionalita());
		dipendenti.setSesso(dipendentiDto.getSesso());
		
		return dipendenti;
	}
}
