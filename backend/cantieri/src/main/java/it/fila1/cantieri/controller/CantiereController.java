package it.fila1.cantieri.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

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

import it.fila1.cantieri.repositories.CantiereRepository;
import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.entities.Cantiere;
import it.fila1.cantieri.dto.CantiereDto;
import it.fila1.cantieri.dto.CantiereDtoUpdator;
import it.fila1.cantieri.mapper.CantiereMapper;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Transactional // Add this annotation
@RestController
public class CantiereController {
	
	private CantiereRepository cantiereRepository;
	
	public CantiereController (CantiereRepository cantiereRepository) 
	{
		this.cantiereRepository = cantiereRepository;
	}

	@GetMapping("/cantieri")
	public ResponseEntity<List<Cantiere>> index()
	{	
		List<Cantiere> products = this.cantiereRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(products);
	}
	
	@GetMapping("/cantieri/{id}")
	public ResponseEntity<?> show(@PathVariable Long id)
	{
		Optional<Cantiere> optionalCantiere = this.cantiereRepository.findById(id);
		
		if (optionalCantiere.isEmpty()) 
		{
			//404
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cantiere non trovato");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(optionalCantiere);
	}
	
	@PostMapping("/cantieri")
	public ResponseEntity<?> store(@RequestBody CantiereDto cantiereDto) {
	    try {
	        System.out.println("Received CantiereDto: " + cantiereDto);
	        
	        // Convert DTO to Entity
	        Cantiere cantiere = CantiereMapper.dtoToEntity(cantiereDto);
	        
	        // Debug: Check if relationships are set before saving
	        if (cantiere.getAzienda() != null) {
	            System.out.println("Number of aziende: " + cantiere.getAzienda().size());
	            for (Azienda az : cantiere.getAzienda()) {
	                System.out.println("Azienda cantiere reference set: " + (az.getCantiere() != null));
	            }
	        }
	        
	        // Save the entity
	        Cantiere savedCantiere = cantiereRepository.save(cantiere);
	        
	        System.out.println("Saved cantiere with ID: " + savedCantiere.getId());
	        
	        // Debug: Check if aziende were saved with FK
	        if (savedCantiere.getAzienda() != null) {
	            for (Azienda az : savedCantiere.getAzienda()) {
	                System.out.println("Saved azienda ID: " + az.getId() + ", FK: " + 
	                    (az.getCantiere() != null ? az.getCantiere().getId() : "NULL"));
	            }
	        }
	        
	        return ResponseEntity.status(HttpStatus.OK).body("Cantiere and related Aziende created successfully");
	        
	    } catch (Exception e) {
	        System.err.println("Error saving cantiere: " + e.getMessage());
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Error saving cantiere: " + e.getMessage());
	    }
	}
	
	@DeleteMapping("/cantieri/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id)
	{
		Optional<Cantiere> optionalCantiere = this.cantiereRepository.findById(id);
		
		if (optionalCantiere.isEmpty()) 
		{
			//404
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cantiere non trovato");
		}
		
		cantiereRepository.deleteById(id);
		
		return ResponseEntity.status(HttpStatus.OK).body("cancellato");
	}
	
	/*
	@PutMapping("/cantieri/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CantiereDtoUpdator cantiereDto){
		
		Cantiere cantiere = CantiereMapper.dtoToEntityUpdator(cantiereDto);
		
		Optional<Cantiere> optionalCantiere = this.cantiereRepository.findById(id);
		
		if (optionalCantiere.isEmpty()) 
		{
			//404
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cantiere non trovato");
		}
		Cantiere c2=optionalCantiere.get();
		
		if(c2.getCap()!=0)
			cantiere.setCap(c2.getCap());
		if(c2.getCommittente()!=null)
			cantiere.setCommittente(c2.getCommittente());
		if(c2.getNome()!=null)
			cantiere.setNome(c2.getNome());
		if(c2.getData_fine_cantiere()!=null)
			cantiere.setData_fine_cantiere(c2.getData_fine_cantiere());
		if(c2.getData_inizio_cantiere()!=null)
			cantiere.setData_inizio_cantiere(c2.getData_inizio_cantiere());
		if(c2.getEmail()!=null)
			cantiere.setEmail(c2.getEmail());
		if(c2.getFirma()!=null)
			cantiere.setFirma(c2.getFirma());
		if(c2.getLogo()!=null)
			cantiere.setLogo(c2.getLogo());
		if(c2.getNazione()!=null)
			cantiere.setLogo(c2.getLogo());
		if(c2.getPdf()!=null)
			cantiere.setPdf(c2.getPdf());
		
		cantiereRepository.save(cantiere);
		
		return ResponseEntity.status(HttpStatus.OK).body("updated");
	}
	
	*/
	
	
	
}
