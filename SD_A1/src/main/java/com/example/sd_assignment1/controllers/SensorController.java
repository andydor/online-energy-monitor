package com.example.sd_assignment1.controllers;

import com.example.sd_assignment1.dtos.request.AssignSensorDTO;
import com.example.sd_assignment1.dtos.request.SensorAddUpdateDTO;
import com.example.sd_assignment1.entities.Sensor;
import com.example.sd_assignment1.services.SensorService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/sensors")
public class SensorController {
    private final SensorService sensorService;

    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/add")
    @Transactional
    public Long addSensor(@RequestBody SensorAddUpdateDTO sensorAddUpdateDTO) {
        return this.sensorService.addSensor(sensorAddUpdateDTO);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public List<Sensor> getAllSensors() {
        return this.sensorService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/update/{id}")
    public String updateSensor(@PathVariable Long id, @RequestBody SensorAddUpdateDTO sensorAddUpdateDTO) {
        return this.sensorService.updateSensor(id, sensorAddUpdateDTO);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/delete/{id}")
    @Transactional
    public String deleteSensor(@PathVariable Long id) {
        return this.sensorService.deleteSensor(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/unassigned")
    public List<Sensor> getUnassignedSensors() {
        return this.sensorService.getUnassignedSensors();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/assign/{id}")
    public String assignSensorToDevice(@PathVariable Long id, @RequestBody AssignSensorDTO assignSensorDTO) {
        return this.sensorService.assignSensorToDevice(id, assignSensorDTO.getSensorId());
    }
}
