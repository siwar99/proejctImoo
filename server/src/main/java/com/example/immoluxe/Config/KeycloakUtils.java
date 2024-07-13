package com.example.immoluxe.Config;

import com.example.immoluxe.Entity.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class KeycloakUtils {
    public User getCurrentUser(@AuthenticationPrincipal Jwt principal) {
        if (principal == null) {
            throw new IllegalArgumentException("Principal cannot be null");
        }

        User user = new User();
        user.setUser_id(principal.getClaimAsString("sub"));
        user.setUsername(principal.getClaimAsString("preferred_username"));
        user.setEmail(principal.getClaimAsString("email"));
        user.setFirstName(principal.getClaimAsString("given_name"));
        user.setLastName(principal.getClaimAsString("family_name"));

        return user;
    }
}
