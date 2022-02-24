package com.example.sd_assignment1.repositories;

import com.example.sd_assignment1.entities.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    Optional<Measurement> findTopByOrderByIdDesc();

    List<Measurement> findMeasurementsBySensorId(Long id);
}
