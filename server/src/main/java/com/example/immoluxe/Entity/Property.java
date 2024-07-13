package com.example.immoluxe.Entity;

import com.example.immoluxe.Common.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Property extends BaseEntity {

 private String adresse;
 private String type;
 private double price;
 private int bedrooms;
 private int bathrooms;
 private double area;
 private String description;

 @Enumerated(EnumType.STRING)
 @Column(length = 25)
 private StatusProperty propertyStatus;

 @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
 @JsonManagedReference(value = "property-rdv")
 private List<RDV> rdvs = new ArrayList<>();

 @ManyToOne(fetch = FetchType.LAZY)
 @JoinColumn(name ="user_id", nullable = false)
 @JsonBackReference(value = "user-property")
 private User userHost;
}