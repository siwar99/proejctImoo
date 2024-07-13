package com.example.immoluxe.Service;


import com.example.immoluxe.Config.KeycloakUtils;
import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.StatusProperty;
import com.example.immoluxe.Entity.TypeProperty;
import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Repository.PropertyRepository;
import com.example.immoluxe.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.keycloak.KeycloakPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImp implements IPropertyService{
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KeycloakUtils keycloakUtils;
    @Override
    public Property AddProperty(@AuthenticationPrincipal Jwt principal, Property property) {
        property.setPropertyStatus(StatusProperty.Disponible);
        User userProfile = keycloakUtils.getCurrentUser(principal);
        Optional<User> existingUser = userRepository.findById(userProfile.getUser_id());
        if (!existingUser.isPresent()) {
            userProfile = userRepository.save(userProfile);
        } else {
            userProfile = existingUser.get();
        }
        property.setUserHost(userProfile);
        return propertyRepository.save(property);
    }
    @Override
    public List<Property> getAvailableProperties() {
        return propertyRepository.findByPropertyStatus(StatusProperty.Disponible);
    }
    @Override
    public List<Property> GetAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Property GetPropertyById(Long id) {

        return propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found with id : "+ id));
    }

    @Override
    public StatusProperty GetPropertyStatusById(Long id) {
        return null;
    }

    @Override
    public TypeProperty GetPropertyTypeById(Long id) {
        return null;
    }

    @Override
    public User GetProprietaireByIdProperty(Long id) {
        return null;
    }

    @Override
    public List<Property> GetAllPropertyByType(TypeProperty type) {
        return null;
    }

    @Override
    public Property UpdateProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public void DeletePropertyById(Long id) {
        propertyRepository.deleteById(id);
    }
}