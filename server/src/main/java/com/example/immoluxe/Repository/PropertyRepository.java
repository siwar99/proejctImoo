package com.example.immoluxe.Repository;

import com.example.immoluxe.Entity.StatusProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.immoluxe.Entity.Property;

import java.util.List;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByPropertyStatus(StatusProperty status);
}