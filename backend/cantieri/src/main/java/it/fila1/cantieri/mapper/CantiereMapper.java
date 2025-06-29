package it.fila1.cantieri.mapper;

import java.util.ArrayList;
import java.util.List;

import it.fila1.cantieri.dto.AziendaDto;
import it.fila1.cantieri.dto.CantiereDto;
import it.fila1.cantieri.dto.CantiereDtoUpdator;
import it.fila1.cantieri.entities.Cantiere;
import it.fila1.cantieri.entities.Azienda;

public class CantiereMapper {

	public static Cantiere dtoToEntity(CantiereDto cantiereDto) {
	    Cantiere cantiere = new Cantiere();
	    cantiere.setCap(cantiereDto.getCap());
	    cantiere.setNome(cantiereDto.getNome());
	    cantiere.setCommittente(cantiereDto.getCommittente());
	    cantiere.setData_fine_cantiere(cantiereDto.getData_fine_cantiere());
	    cantiere.setData_inizio_cantiere(cantiereDto.getData_inizio_cantiere());
	    cantiere.setEmail(cantiereDto.getEmail());
	    cantiere.setFirma(cantiereDto.getFirma());
	    cantiere.setLogo(cantiereDto.getLogo());
	    cantiere.setNazione(cantiereDto.getNazione());
	    cantiere.setPdf(cantiereDto.getPdf());

	    // Handle the azienda list conversion and set the fk_cantiere properly
	    if (cantiereDto.getAzienda() != null && !cantiereDto.getAzienda().isEmpty()) {
	        List<Azienda> aziendeList = new ArrayList<>();
	        for (AziendaDto aziendaDto : cantiereDto.getAzienda()) {
	            Azienda azienda = AziendaMapper.convertAziendaDtoToEntity(aziendaDto);
	            azienda.setCantiere(cantiere);  // Associate the Cantiere with the Azienda
	            aziendeList.add(azienda);
	        }
	        cantiere.setAzienda(aziendeList);
	    }

	    return cantiere;
	}
	
	public static Cantiere dtoToEntity(CantiereDtoUpdator cantiereDto) {
	    Cantiere cantiere = new Cantiere();
	    cantiere.setCap(cantiereDto.getCap());
	    cantiere.setNome(cantiereDto.getNome());
	    cantiere.setCommittente(cantiereDto.getCommittente());
	    cantiere.setData_fine_cantiere(cantiereDto.getData_fine_cantiere());
	    cantiere.setData_inizio_cantiere(cantiereDto.getData_inizio_cantiere());
	    cantiere.setEmail(cantiereDto.getEmail());
	    cantiere.setFirma(cantiereDto.getFirma());
	    cantiere.setLogo(cantiereDto.getLogo());
	    cantiere.setNazione(cantiereDto.getNazione());
	    cantiere.setPdf(cantiereDto.getPdf());

	    // Handle the azienda list conversion and set the fk_cantiere properly
	    if (cantiereDto.getAzienda() != null && !cantiereDto.getAzienda().isEmpty()) {
	        List<Azienda> aziendeList = new ArrayList<>();
	        for (AziendaDto aziendaDto : cantiereDto.getAzienda()) {
	            Azienda azienda = AziendaMapper.convertAziendaDtoToEntity(aziendaDto);
	            azienda.setCantiere(cantiere);  // Associate the Cantiere with the Azienda
	            aziendeList.add(azienda);
	        }
	        cantiere.setAzienda(aziendeList);
	    }

	    return cantiere;
	}

}