package com.example.immoluxe.Service;

import com.example.immoluxe.Config.KeycloakUtils;
import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.RDV;
import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Repository.RDVRepository;
import com.example.immoluxe.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RDVServiceImp implements IRDVService {
    @Autowired
    private RDVRepository rdvRepository;
    @Autowired
    private IPropertyService iPropertyService;
    @Autowired
    private KeycloakUtils keycloakUtils;
    @Autowired
    private UserRepository userRepository;
    @Override
    public List<RDV> getRDVsForProperty(Property property) {
        return rdvRepository.findByProperty(property);
    }
    @Override
    public List<LocalDateTime> getUnavailableDatesForProperty(Property property) {
        List<RDV> rdvs = rdvRepository.findByProperty(property);
        return rdvs.stream()
                .map(rdv -> rdv.getDateHeure())
                .distinct()
                .collect(Collectors.toList());
    }
    @Override
    public boolean isTimeSlotAvailable(Property property, LocalDateTime dateHeure) {

        if (dateHeure.isBefore(LocalDateTime.now())) {
            return false;
        }
        LocalDate dateJour = dateHeure.toLocalDate();
        LocalDateTime end = dateHeure.plusMinutes(30);

        List<RDV> rdvs = rdvRepository.findByPropertyAndDateHeureBetween(property, dateJour.atStartOfDay(), dateJour.plusDays(1).atStartOfDay());

        for (RDV rdv : rdvs) {
            LocalDateTime existingStart = rdv.getDateHeure();
            LocalDateTime existingEnd = existingStart.plusMinutes(30);
            if (dateJour.equals(existingStart.toLocalDate())) {
                if (dateHeure.isBefore(existingEnd) && end.isAfter(existingStart)) {
                    return false;
                }
            }
        }

        return true;
    }
    @Override
    public RDV createRDV(RDV rdv,Long propertyId,@AuthenticationPrincipal Jwt principal) {

        Property property=iPropertyService.GetPropertyById(propertyId);
        User userProfile = keycloakUtils.getCurrentUser(principal);
        Optional<User> existingUser = userRepository.findById(userProfile.getUser_id());
        if (!existingUser.isPresent()) {
            userProfile = userRepository.save(userProfile);
        } else {
            userProfile = existingUser.get();
        }
        rdv.setUserClient(userProfile);
        rdv.setProperty(property);
        if (isTimeSlotAvailable(property, rdv.getDateHeure())) {
            return rdvRepository.save(rdv);
        } else {
            throw new RuntimeException("Time slot not available");
        }
    }
    @Override
    public List<RDV> getAllByUSerClient(@AuthenticationPrincipal Jwt principal){
        User userClient = keycloakUtils.getCurrentUser(principal);
        return rdvRepository.findByUserClient(userClient);
    }

    @Override
    public void deleteById(Long id,@AuthenticationPrincipal Jwt principal) {
        User userClient = keycloakUtils.getCurrentUser(principal);
        RDV rdv= rdvRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("RDV not found with id :"+id));
        if(rdv.getUserClient().getUser_id().equals(userClient.getUser_id())){
            rdvRepository.deleteById(id);
        }else {
            throw new AccessDeniedException("You are not authorized to delete this RDV");
        }
    }

}
