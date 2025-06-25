package it.fila1.cantieri.mapper;

import it.fila1.cantieri.dto.AziendaDto;
import it.fila1.cantieri.dto.AziendaDtoUpdator;
import it.fila1.cantieri.entities.Azienda;

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
	    
	    return azienda;
	}

}
