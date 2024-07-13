package com.example.immoluxe.Service;

import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.RDV;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IRDVService {
    RDV createRDV(RDV rdv,Long propertyId,@AuthenticationPrincipal Jwt principal);
    List<LocalDateTime> getUnavailableDatesForProperty(Property property);
    List<RDV> getRDVsForProperty(Property property);
    boolean isTimeSlotAvailable(Property property, LocalDateTime dateHeure);
    List<RDV> getAllByUSerClient(@AuthenticationPrincipal Jwt principal);
    void deleteById(Long id,@AuthenticationPrincipal Jwt principal);
}
