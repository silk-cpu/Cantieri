package it.fila1.cantieri.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import it.fila1.cantieri.entities.Cantiere;

public interface CantiereRepository extends JpaRepository<Cantiere, Long>{
	

}
