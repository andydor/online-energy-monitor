package com.example.sd_assignment1.repositories;

import com.example.sd_assignment1.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findClientByUserId(Long userId);

    Optional<Client> findClientByUserUsername(String username);
}