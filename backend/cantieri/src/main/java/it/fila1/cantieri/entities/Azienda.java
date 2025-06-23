package it.fila1.cantieri.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;

import it.fila1.cantieri.entities.Cantiere;
@Entity
@Table(name = "aziende")
@Getter @Setter @NoArgsConstructor @ToString
public class Azienda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String ragione_sociale;

    @Column
    private String natura_giuridica;

    @Column
    private int piva;

    @Column
    private String codice_ateco;

    @Column
    private String indirizzo;

    @Column
    private String mappa;

    @Column
    private String email;
    
    
    // Many-to-one relationship with Cantiere
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_cantiere") 
    @JsonIgnore  // Add this annotation
    private Cantiere cantiere;
    

	@Column(name = "fk_cantiere", insertable = false, updatable = false)
	@JsonProperty("fk_cantiere")
	private Long fkCantiere;
	
	// Add this method to handle the relationship when posting
	@JsonSetter("fk_cantiere")
	public void setFkCantiere(Long fkCantiere) {
	    this.fkCantiere = fkCantiere;
	    if (fkCantiere != null) {
	        this.cantiere = new Cantiere();
	        this.cantiere.setId(fkCantiere); // Assuming Cantiere has setId method
	    } else {
	        this.cantiere = null;
	    }
	}
}