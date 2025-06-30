package it.fila1.cantieri.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import it.fila1.cantieri.dto.AziendaDto;
import it.fila1.cantieri.dto.AziendaDtoUpdator;
import it.fila1.cantieri.dto.Coordinates;
import it.fila1.cantieri.entities.Azienda;
import it.fila1.cantieri.entities.Cantiere;
import it.fila1.cantieri.mapper.AziendaMapper;
import it.fila1.cantieri.repositories.AziendaRepository;
import it.fila1.cantieri.repositories.CantiereRepository;
import it.fila1.cantieri.services.GeocodingService;

@RestController
public class AziendaController {

    private final AziendaRepository aziendaRepository;
    private final CantiereRepository cantiereRepository;
    private final GeocodingService geocodingService;

    public AziendaController(AziendaRepository aziendaRepository, CantiereRepository cantiereRepository, GeocodingService geocodingService) {
        this.aziendaRepository = aziendaRepository;
        this.cantiereRepository = cantiereRepository;
        this.geocodingService = geocodingService;
    }

    @GetMapping("/aziende")
    public ResponseEntity<List<Azienda>> index() {
        return ResponseEntity.ok(aziendaRepository.findAll());
    }

    @GetMapping("/aziende/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        return aziendaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/azienda")
    public ResponseEntity<?> store(@RequestBody AziendaDto aziendaDto) {
        try {
            Azienda azienda = AziendaMapper.convertAziendaDtoToEntity(aziendaDto);
            String nazione = aziendaDto.getNazione();
            nazione = nazione.toUpperCase();
            nazione = nazione.substring(0, 2);
            if (aziendaDto.getFk_cantiere() != null) {
                Optional<Cantiere> cantiere = cantiereRepository.findById(aziendaDto.getFk_cantiere());
                if (cantiere.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cantiere non trovato");
                }
            }
            
            // Automatically geocode address using structured geocoding if address available
            if (azienda.getIndirizzo() != null && !azienda.getIndirizzo().isEmpty()) {
                // Assume indirizzo is like "Via Roma 1"
                String street = azienda.getIndirizzo();
                String city = azienda.getCitta();      // You can enhance: extract city dynamically or add field
                String state = azienda.getStato(); // Adjust or parametrize accordingly
                String country = nazione;

                Coordinates coords = geocodingService.geocodeStructured(street, city, state, null, country);
                azienda.setMappa("Lat: "+coords.getLat() + " Long: " + coords.getLon());
            }

            aziendaRepository.save(azienda);
            return ResponseEntity.ok("Azienda creata con successo");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore: " + e.getMessage());
        }
    }

    @PutMapping("/azienda/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody AziendaDtoUpdator aziendaDto) {
        return aziendaRepository.findById(id)
                .map(existing -> {
                    Azienda updated = AziendaMapper.convertAziendaDtoToEntity(aziendaDto);

                    if (updated.getCodice_ateco() != null) existing.setCodice_ateco(updated.getCodice_ateco());
                    if (updated.getEmail() != null) existing.setEmail(updated.getEmail());
                    if (updated.getFkCantiere() != null) existing.setFkCantiere(updated.getFkCantiere());
                    if (updated.getIndirizzo() != null) existing.setIndirizzo(updated.getIndirizzo());

                    if (updated.getIndirizzo() != null && !updated.getIndirizzo().isEmpty()) {
                        try {
                            // Use structured geocoding on update, similar assumptions as above
                            String street = updated.getIndirizzo();
                            String city = "Milano";     // or retrieve dynamically or from DTO if possible
                            String state = "Lombardia";
                            String country = "IT";

                            Coordinates coords = geocodingService.geocodeStructured(street, city, state, null, country);
                            existing.setMappa(coords.getLat() + " " + coords.getLon());
                        } catch (Exception e) {
                            // If geocoding fails, log or ignore, but allow update to proceed
                        }
                    } else if (updated.getMappa() != null) {
                        existing.setMappa(updated.getMappa());
                    }

                    if (updated.getNatura_giuridica() != null) existing.setNatura_giuridica(updated.getNatura_giuridica());
                    if (updated.getPiva() != 0) existing.setPiva(updated.getPiva());
                    if (updated.getRagione_sociale() != null) existing.setRagione_sociale(updated.getRagione_sociale());

                    aziendaRepository.save(existing);
                    return ResponseEntity.ok("Azienda aggiornata");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Azienda non trovata"));
    }

    @DeleteMapping("/aziende/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return aziendaRepository.findById(id)
                .map(azienda -> {
                    aziendaRepository.deleteById(id);
                    return ResponseEntity.ok("Cancellata");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Azienda non trovata"));
    }
}
