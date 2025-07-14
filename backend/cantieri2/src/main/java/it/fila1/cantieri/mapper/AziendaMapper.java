package it.fila1.cantieri.mapper;

import java.util.ArrayList;
import java.util.List;

import it.fila1.cantieri.dto.AziendaDto;
import it.fila1.cantieri.dto.AziendaDtoUpdator;
import it.fila1.cantieri.dto.DipendentiDto;
import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.entities.Dipendenti;

public class AziendaMapper {
	public static Azienda convertAziendaDtoToEntity(AziendaDto aziendaDto) {
	    Azienda azienda = new Azienda();
	    azienda.setRagione_sociale(aziendaDto.getRagione_sociale());
	    azienda.setNatura_giuridica(aziendaDto.getNatura_giuridica());
	    azienda.setPiva(aziendaDto.getPiva());
	    azienda.setCodice_ateco(aziendaDto.getCodice_ateco());
	    azienda.setIndirizzo(aziendaDto.getIndirizzo());
	    azienda.setMappa(aziendaDto.getMappa());
	    azienda.setEmail(aziendaDto.getEmail());
	    azienda.setFkCantiere(aziendaDto.getFk_cantiere());
	    azienda.setCitta(aziendaDto.getCitta());
	    azienda.setStato(aziendaDto.getStato());
	    
	 // Handle the azienda list conversion and set the fk_cantiere properly
	    if (aziendaDto.getDipendenti() != null && !aziendaDto.getDipendenti().isEmpty()) {
	        List<Dipendenti> dipendentiList = new ArrayList<>();
	        for (DipendentiDto dipendentiDto : aziendaDto.getDipendenti()) {
	            Dipendenti dp = DipendentiMapper.dtoToEntity(dipendentiDto);
	            dp.setAzienda(azienda);  // Associate the Cantiere with the Azienda
	            dipendentiList.add(dp);
	        }
	        azienda.setDipendenti(dipendentiList);
	    }
	    
	    return azienda;
	}
	
	public static Azienda convertAziendaDtoToEntity(AziendaDtoUpdator aziendaDto) {
	    Azienda azienda = new Azienda();
	    azienda.setRagione_sociale(aziendaDto.getRagione_sociale());
	    azienda.setNatura_giuridica(aziendaDto.getNatura_giuridica());
	    azienda.setPiva(aziendaDto.getPiva());
	    azienda.setCodice_ateco(aziendaDto.getCodice_ateco());
	    azienda.setIndirizzo(aziendaDto.getIndirizzo());
	    azienda.setMappa(aziendaDto.getMappa());
	    azienda.setEmail(aziendaDto.getEmail());
	    azienda.setFkCantiere(aziendaDto.getFk_cantiere());
	    azienda.setCitta(aziendaDto.getCitta());
	    azienda.setStato(aziendaDto.getStato());
	    
	    if (aziendaDto.getDipendenti() != null && !aziendaDto.getDipendenti().isEmpty()) {
	        List<Dipendenti> dipendentiList = new ArrayList<>();
	        for (DipendentiDto dipendentiDto : aziendaDto.getDipendenti()) {
	            Dipendenti dp = DipendentiMapper.dtoToEntity(dipendentiDto);
	            dp.setAzienda(azienda);  // Associate the Cantiere with the Azienda
	            dipendentiList.add(dp);
	        }
	        azienda.setDipendenti(dipendentiList);
	    }
	    
	    return azienda;
	}

}
