package it.fila1.cantieri.controller;



import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.repositories.AziendaRepository;
import jakarta.validation.Valid;

@RestController
public class AziendaController {
	
private AziendaRepository aziendaRepository;
	
	public AziendaController (AziendaRepository aziendaRepository) 
	{
		this.aziendaRepository = aziendaRepository;
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

}

	