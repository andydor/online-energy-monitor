package com.example.sd_assignment1.repositories;

import com.example.sd_assignment1.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    Optional<Device> getDeviceById(Long id);

    void deleteDeviceById(Long id);
}
