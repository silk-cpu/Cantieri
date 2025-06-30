package it.fila1.cantieri.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GeocodeResponse {
	private String lat;
	private String lon;
	
	@JsonProperty("display_name")
	private String displayName;

}
