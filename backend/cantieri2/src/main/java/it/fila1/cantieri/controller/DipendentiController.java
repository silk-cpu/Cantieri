package it.fila1.cantieri.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.fila1.cantieri.dto.Coordinates;
import it.fila1.cantieri.dto.DipendentiDto;
import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.entities.Dipendenti;
import it.fila1.cantieri.mapper.AziendaMapper;
import it.fila1.cantieri.mapper.DipendentiMapper;
import it.fila1.cantieri.repositories.AziendaRepository;
import it.fila1.cantieri.repositories.DipendentiRepository;

@RestController
public class DipendentiController {
	
	DipendentiRepository dipedenteRepository;
	AziendaRepository aziendaRepository;
	
	DipendentiController(DipendentiRepository dipendenteRepository,AziendaRepository aziendaRepository){
		this.dipedenteRepository = dipendenteRepository;
		this.aziendaRepository = aziendaRepository;
	}
	
	@GetMapping("/dipendenti")
	public ResponseEntity<?> getDipendenti() {
		List<Dipendenti> dipendenti = this.dipedenteRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(dipendenti);
	}
	
	@GetMapping("/dipendenti/{id}")
	public ResponseEntity<?> getDipendentiById(@PathVariable Long id) {
		Optional<Dipendenti> dipendenti = this.dipedenteRepository.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(dipendenti);
	}
	
	@PostMapping("/dipendenti")
	public ResponseEntity<?> setDipendenti(@RequestBody DipendentiDto dipendentiDto) {
		
		Dipendenti dipendenti = DipendentiMapper.dtoToEntity(dipendentiDto);
		
		this.dipedenteRepository.save(dipendenti);
		
		return ResponseEntity.status(HttpStatus.OK).body(dipendenti);
	}
	
	@PutMapping("/dipendenti/{id}")
	public ResponseEntity<?> updateDipendenti(@PathVariable Long id, @RequestBody DipendentiDto dipendentiDto) {
		return dipedenteRepository.findById(id)
				.map(existing -> {
					
					Optional<Azienda> aziendaOptional = this.aziendaRepository.findById(dipendentiDto.getFkAzienda());
					Azienda azienda = aziendaOptional.get();
					Dipendenti updated = DipendentiMapper.dtoToEntity(dipendentiDto,azienda);

                    if (updated.getCodice_fiscale() != null) existing.setCodice_fiscale(updated.getCodice_fiscale());
                    if (updated.getCognome() != null) existing.setCognome(updated.getCognome());
                    if (updated.getNome() != null) existing.setNome(updated.getNome());
                    if (updated.getData_nascita() != null) existing.setData_nascita(updated.getData_nascita());
                    if (updated.getNazionalita() != null) existing.setNazionalita(updated.getNazionalita());
                    existing.setAzienda(updated.getAzienda());
                    if (updated.getSesso() != null) existing.setSesso(updated.getSesso());

                    dipedenteRepository.save(existing);
                    return ResponseEntity.ok("Dipendente aggiornato");
				})
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dipendente non trovato"));
	}

}
