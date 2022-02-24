package com.example.sd_assignment1.repositories;

import com.example.sd_assignment1.entities.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
    Optional<Sensor> getSensorById(Long id);

    void deleteSensorById(Long id);
}
