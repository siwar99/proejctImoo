package com.example.immoluxe.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

// @EqualsAndHashCode
// @ToString
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "app_user")
public class User {
    @Id
    @Column(name = "user_id")
    private String user_id ;
    private String username;
    private String email;
    private String firstName;
    private String lastName;

    @OneToMany(mappedBy = "userHost", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "user-property")
    private List<Property> properties = new ArrayList<>();

    @OneToMany(mappedBy = "userClient", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "user-rdv")
    private List<RDV> rdvs = new ArrayList<>();
}
