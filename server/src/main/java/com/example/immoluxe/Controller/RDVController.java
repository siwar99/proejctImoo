package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.RDV;
import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Service.IPropertyService;
import com.example.immoluxe.Service.IRDVService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rdv")
public class RDVController {
    @Autowired
    private  IRDVService rdvService;
    @Autowired
    private  IPropertyService iPropertyService;
    @PostMapping(value = "/{propertyId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createRDV(@RequestBody RDV rdv,@PathVariable Long  propertyId,@AuthenticationPrincipal Jwt principal) {

        try {
           return new ResponseEntity<>(rdvService.createRDV(rdv,propertyId,principal),HttpStatus.OK);
       }catch (RuntimeException e) {
           String errorMessage = e.getMessage();
           Map<String, Object> response = new HashMap<>();
           response.put("error", errorMessage);
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

       }

    }
    @GetMapping("/date/{propertyTd}")
    public ResponseEntity<List<LocalDateTime>> getUnavailableDatesForProperty(@PathVariable  Long propertyTd){
        Property property=iPropertyService.GetPropertyById(propertyTd);
        return new ResponseEntity<>(rdvService.getUnavailableDatesForProperty(property),HttpStatus.OK);
    }
    /* validateur  */
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<RDV>> getRDVsForProperty(@PathVariable Long propertyId) {
        Property property = iPropertyService.GetPropertyById(propertyId);
        return new ResponseEntity<>(rdvService.getRDVsForProperty(property), HttpStatus.OK);
    }

    @GetMapping("/client")
    public ResponseEntity<List<RDV>> getAllByUserClient(@AuthenticationPrincipal Jwt principal){
        return new ResponseEntity<>(rdvService.getAllByUSerClient(principal),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id, @AuthenticationPrincipal Jwt principal) {
        try {
            rdvService.deleteById(id, principal);
            return ResponseEntity.ok("RDV deleted successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }
}