package it.fila1.cantieri.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.fila1.cantieri.dto.CredenzialiDto;
import it.fila1.cantieri.entities.Credenziali;
import it.fila1.cantieri.mapper.CredenzialiMapper;
import it.fila1.cantieri.repositories.CredenzialiRepository;

@RestController
public class CredenzialiController {
	
	private final CredenzialiRepository credenzialiRepository;
	
	public CredenzialiController(CredenzialiRepository credenzialiRepository){
		this.credenzialiRepository = credenzialiRepository;
	}
	
	@GetMapping("/credenziali")
	public ResponseEntity<?> getCredenziali(){
		
		List<Credenziali> credenziali = credenzialiRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(credenziali);
	}
	
	@PostMapping("/credenziali")
	public ResponseEntity<?> register(@RequestBody CredenzialiDto credenzialiDto){
		
		Credenziali credenziali = CredenzialiMapper.dtoToEntity(credenzialiDto);
		
		List<Credenziali> allCredenziali = credenzialiRepository.findAll();
		
		for(int i = 0;i<allCredenziali.size();i++)
		{
			if(allCredenziali.get(i).getUser()==credenziali.getUser()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("utente non disponibile"); 
			}
		}
		
		credenzialiRepository.save(credenziali);
		
		return ResponseEntity.status(HttpStatus.OK).body("inserito");
	}
}
