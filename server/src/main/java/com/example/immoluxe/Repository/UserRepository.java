package com.example.immoluxe.Repository;

import com.example.immoluxe.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
/*
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationToken(String token);

 */
}
