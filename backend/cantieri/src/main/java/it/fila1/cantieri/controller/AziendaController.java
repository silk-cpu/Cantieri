package it.fila1.cantieri.controller;



import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.fila1.cantieri.dto.AziendaDto;
import it.fila1.cantieri.dto.AziendaDtoUpdator;
import it.fila1.cantieri.dto.CantiereDto;
import it.fila1.cantieri.dto.CantiereDtoUpdator;
import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.entities.Cantiere;
import it.fila1.cantieri.mapper.AziendaMapper;
import it.fila1.cantieri.mapper.CantiereMapper;
import it.fila1.cantieri.repositories.AziendaRepository;
import it.fila1.cantieri.repositories.CantiereRepository;
import jakarta.validation.Valid;

@RestController
public class AziendaController {
	
private AziendaRepository aziendaRepository;
private CantiereRepository cantiereRepository;

	
	public AziendaController (AziendaRepository aziendaRepository, CantiereRepository cantiereRepository)
	{
		this.aziendaRepository = aziendaRepository;
		this.cantiereRepository= cantiereRepository;
	}
	
	@GetMapping("/aziende")
	public ResponseEntity<List<Azienda>> index()
	{	
		List<Azienda> aziende = this.aziendaRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(aziende);
	}
	
	@GetMapping("/aziende/{id}")
	public ResponseEntity<?> show(@PathVariable Long id)
	{
		Optional<Azienda> optionalAzienda = this.aziendaRepository.findById(id);
		
		if (optionalAzienda.isEmpty()) 
		{
			//404
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Azienda non trovata");
		}
		else 
		{
			return ResponseEntity.status(HttpStatus.OK).body(optionalAzienda.get());
		}
	}
	
	@PostMapping("/azienda")
	public ResponseEntity<?> store(@RequestBody AziendaDto aziendaDto) {
	    try {
	        System.out.println("Received CantiereDto: " + aziendaDto);
	        
	        // Convert DTO to Entity
	        Azienda azienda = AziendaMapper.convertAziendaDtoToEntity(aziendaDto);
	        
	        
	        if(aziendaDto.getFk_cantiere()!=null) {
	        	Optional<Cantiere> cantiere= cantiereRepository.findById(aziendaDto.getFk_cantiere());
	        	if(cantiere.isEmpty()) {
	        		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cantiere with ID " + aziendaDto.getFk_cantiere() + " not found");

	        	}
	        }
	        
	        System.out.println("fk_cantiere: "+azienda.getFkCantiere());	        // Save the entity
	        Azienda savedAzienda = aziendaRepository.save(azienda);
	        
	        System.out.println("Saved azienda with ID: " + savedAzienda.getId());
	        
	        return ResponseEntity.status(HttpStatus.OK).body("Aziende created successfully");
	        
	    } catch (Exception e) {
	        System.err.println("Error saving azienda: " + e.getMessage());
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Error saving azienda: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/aziende/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id)
	{
		Optional<Azienda> optionalAzienda = this.aziendaRepository.findById(id);
		
		if (optionalAzienda.isEmpty()) 
		{
			//404
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Azienda non trovato");
		}
		
		aziendaRepository.deleteById(id);
		
		return ResponseEntity.status(HttpStatus.OK).body("cancellato");
	}
	
	@PutMapping("/azienda/{id}")
	public ResponseEntity<?> update(
			@PathVariable Long id, 
			@RequestBody AziendaDtoUpdator aziendaDto
	){	
		Azienda a2 = AziendaMapper.convertAziendaDtoToEntity(aziendaDto);
		
		Optional<Azienda> optionalAzienda = this.aziendaRepository.findById(id);
		
		if (optionalAzienda.isEmpty()) 
		{
			//404
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cantiere non trovato");
		}
		Azienda azienda=optionalAzienda.get();
		
		if(a2.getCodice_ateco()!=null)
			azienda.setCodice_ateco(a2.getCodice_ateco());
		if(a2.getEmail()!=null)
			azienda.setEmail(a2.getEmail());
		if(a2.getFkCantiere()!=null)
			azienda.setFkCantiere(a2.getFkCantiere());
		if(a2.getIndirizzo()!=null)
			azienda.setIndirizzo(a2.getIndirizzo());
		if(a2.getMappa()!=null)
			azienda.setMappa(a2.getMappa());
		if(a2.getNatura_giuridica()!=null)
			azienda.setNatura_giuridica(a2.getNatura_giuridica());
		if(a2.getPiva()!=0)
			azienda.setPiva(a2.getPiva());
		if(a2.getRagione_sociale()!=null)
			azienda.setRagione_sociale(a2.getRagione_sociale());
		
		
		aziendaRepository.save(azienda);
		
		return ResponseEntity.status(HttpStatus.OK).body("updated");
	}
	

}

	