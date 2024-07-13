package com.example.immoluxe.Repository;

import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.RDV;
import com.example.immoluxe.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RDVRepository extends JpaRepository<RDV, Long> {
    @Query("select r from RDV r where r.property = ?1")
    List<RDV> findByProperty(Property property);
    @Query("SELECT r FROM RDV r WHERE r.property = :property AND r.dateHeure BETWEEN :start AND :end")
    List<RDV> findByPropertyAndDateHeureBetween(@Param("property") Property property,
                                                @Param("start") LocalDateTime start,
                                                @Param("end") LocalDateTime end);

    @Query("select r from RDV r where r.userClient = ?1")
    List<RDV> findByUserClient(User userClient);
}
