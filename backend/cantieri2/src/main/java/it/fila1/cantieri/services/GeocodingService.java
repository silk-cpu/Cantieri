package it.fila1.cantieri.services;


import it.fila1.cantieri.dto.GeocodeResponse;
import it.fila1.cantieri.dto.Coordinates;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GeocodingService {
    
    private static final Logger logger = LoggerFactory.getLogger(GeocodingService.class);
    private static final String GEOCODING_URL = "https://geocode.maps.co/search";
    
    private final RestTemplate restTemplate;
    
    public GeocodingService() {
        this.restTemplate = new RestTemplate();
    }
    
    /**
     * Geocode an address to coordinates
     * @param address The address to geocode
     * @param countryCode Optional ISO 3166-1 alpha-2 country code (e.g., "IT", "US")
     * @return Coordinates object with lat/lon
     * @throws RuntimeException if geocoding fails
     */
    public Coordinates geocodeAddress(String address, String countryCode) {
        try {
            // Build URL with parameters
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(GEOCODING_URL)
                    .queryParam("q", address)
                    .queryParam("format", "json")
                    .queryParam("limit", "1")
            		.queryParam("api_key","685ffa749e00e056429162iahb7a571");
            
            // Add country code if provided
            if (countryCode != null && !countryCode.isEmpty()) {
                builder.queryParam("countrycodes", countryCode);
            }
            
            String url = builder.toUriString();
            logger.info("Geocoding request: {}", url);
            
            // Make API call
            GeocodeResponse[] responses = restTemplate.getForObject(url, GeocodeResponse[].class);
            
            if (responses != null && responses.length > 0) {
                GeocodeResponse response = responses[0];
                double lat = Double.parseDouble(response.getLat());
                double lon = Double.parseDouble(response.getLon());
                
                logger.info("Geocoding successful: {} -> {}, {}", address, lat, lon);
                return new Coordinates(lat, lon, response.getDisplayName());
            } else {
                throw new RuntimeException("Address not found: " + address);
            }
            
        } catch (Exception e) {
            logger.error("Geocoding failed for address: {}", address, e);
            throw new RuntimeException("Geocoding failed: " + e.getMessage());
        }
    }
    
    /**
     * Geocode an address without country restriction
     */
    public Coordinates geocodeAddress(String address) {
        return geocodeAddress(address, null);
    }
    
    /**
     * Geocode with Italy as default country
     */
    public Coordinates geocodeAddressItaly(String address) {
        return geocodeAddress(address, "IT");
    }
    
    public Coordinates geocodeStructured(
            String street,
            String city,
            String state,
            String postalCode,
            String countryCode) 
    {
        try {
        	street=street.replace(" ","+");
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(GEOCODING_URL)
                    .queryParam("street", street)
                    .queryParam("city", city)
                    .queryParam("state", state)
                    .queryParam("postalcode", postalCode)
                    .queryParam("country", countryCode)
                    .queryParam("format", "json")
                    .queryParam("limit", "1")
                    .queryParam("api_key", "685ffa749e00e056429162iahb7a571");

            String url = builder.toUriString();
            System.out.println(url);
            logger.info("Structured geocoding request: {}", url);

            GeocodeResponse[] responses = restTemplate.getForObject(url, GeocodeResponse[].class);

            if (responses != null && responses.length > 0) {
                GeocodeResponse response = responses[0];
                double lat = Double.parseDouble(response.getLat());
                double lon = Double.parseDouble(response.getLon());
                return new Coordinates(lat, lon, response.getDisplayName());
            } else {
                return new Coordinates(0, 0,"Structured address not found.");
            }
        } catch (Exception e) {
            logger.error("Structured geocoding failed", e);
            throw new RuntimeException("Structured geocoding failed: " + e.getMessage());
        }
    }

}
