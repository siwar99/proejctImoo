package com.example.immoluxe.Entity;

import com.example.immoluxe.Common.BaseEntity;
import com.example.immoluxe.utils.LocalDateTimeDeserializer;
import com.example.immoluxe.utils.LocalDateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RDV extends BaseEntity {
    private String description;


    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime dateHeure;

    @Enumerated(EnumType.STRING)
    @Column(length = 25)
    private StatusRDV statusRDV;

/*-----------Property----------*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="property_id", nullable = false)
    @JsonBackReference(value = "property-rdv")
    private Property property;
    /*------------------User------------*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id", nullable = false)
    @JsonBackReference(value = "user-rdv")
    private User userClient;
}
