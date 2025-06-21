package it.fila1.cantieri.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor

@Entity
@Table(name="cantieri")
public class Cantiere {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String nome;
	@Column
	private String committente;
	@Column
	private int cap;
	@Column
	private String nazione;
	@Column
	private String data_inizio_cantiere;
	@Column
	private String data_fine_cantiere;
	@Column
	private String email;
	@Column
	private String logo;
	@Column
	private String pdf;
	@Column
	private String firma;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cantiere", fetch = FetchType.LAZY)
	private List<Azienda> azienda;
}
