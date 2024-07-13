package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.Property;
import org.springframework.security.oauth2.jwt.Jwt;
import com.example.immoluxe.Service.IPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PropertyController {

    @Autowired
    private IPropertyService iPropertyService;

    //get all properties
    @GetMapping("/properties")
    public List<Property> getAllProperties(){
        return iPropertyService.GetAllProperties();
    }

    //create property
    @PostMapping("/properties")
    public ResponseEntity<Property> createProperty(@AuthenticationPrincipal Jwt   principal, @RequestBody Property property) {
        return new ResponseEntity<>(iPropertyService.AddProperty(principal,property),HttpStatus.CREATED);
    }

    // get property by id
    ///@CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/properties/{id}")
    public ResponseEntity<Property> getPropertyByID(@PathVariable Long id) {
        Property property = iPropertyService.GetPropertyById(id);
        return ResponseEntity.ok(property);
    }

    //update property
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/properties/{id}")
    public ResponseEntity<Property> updatePropertyByID(@PathVariable Long id, @RequestBody Property propertyDetails){
        Property property = iPropertyService.GetPropertyById(id);

        property.setAdresse(propertyDetails.getAdresse());
        property.setType(propertyDetails.getType());
        property.setPrice(propertyDetails.getPrice());
        property.setBedrooms(propertyDetails.getBedrooms());
        property.setBathrooms(propertyDetails.getBathrooms());
        property.setArea(propertyDetails.getArea());
        property.setDescription(propertyDetails.getDescription());

        Property updatedProperty = iPropertyService.UpdateProperty(property);

        return ResponseEntity.ok(updatedProperty);
    }

    //delete property
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProperty(@PathVariable Long id){
        Property property = iPropertyService.GetPropertyById(id);

        iPropertyService.DeletePropertyById(property.getId());

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    /*  all property disponible */
    @GetMapping("/available")
    public ResponseEntity<List<Property>> getAvailableProperties() {
        return new ResponseEntity<>(iPropertyService.getAvailableProperties(), HttpStatus.OK);
    }
}