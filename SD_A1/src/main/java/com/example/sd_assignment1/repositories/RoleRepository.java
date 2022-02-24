package com.example.sd_assignment1.repositories;

import com.example.sd_assignment1.entities.ERole;
import com.example.sd_assignment1.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findRoleByRole(ERole role);
}
