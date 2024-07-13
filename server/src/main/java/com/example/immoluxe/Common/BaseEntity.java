package com.example.immoluxe.Common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @Id
    @GeneratedValue
    private Long id;

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private LocalDateTime createdDate= LocalDateTime.now();

    @LastModifiedDate
    @Column(insertable = true)
    private LocalDateTime lastModifiedDate = LocalDateTime.now();

    @CreatedBy
    @Column(nullable = true, updatable = false)
    private LocalDateTime createdBy = LocalDateTime.now();

    @LastModifiedBy
    @Column(insertable = false)
    private String lastModifiedBy;
}