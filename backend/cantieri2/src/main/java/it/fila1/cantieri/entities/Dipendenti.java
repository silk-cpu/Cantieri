package it.fila1.cantieri.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

@Entity
@Table(name = "dipendenti")
public class Dipendenti {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String nome;
	@Column
	private String cognome;
	@Column
	private String data_nascita;
	@Column
	private String nazionalita;
	@Column
	private String codice_fiscale;
	@Column
	private String sesso;
	
	// Many-to-one relationship with Cantiere
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_azienda") 
    @JsonIgnore  // Add this annotation
    private Azienda azienda;
    
    @JsonProperty("fk_azienda")
    public Long getFkAzienda() {
        return (azienda != null) ? azienda.getId() : null;
    }
    
}
