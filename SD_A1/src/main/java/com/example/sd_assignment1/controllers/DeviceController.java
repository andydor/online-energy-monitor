package com.example.sd_assignment1.controllers;

import com.example.sd_assignment1.dtos.request.AssignDeviceToClientDTO;
import com.example.sd_assignment1.dtos.request.DeviceAddUpdateDTO;
import com.example.sd_assignment1.entities.Device;
import com.example.sd_assignment1.services.DeviceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @RequestMapping("/{username}")
    public List<Device> getDevices(@PathVariable String username) {
        return this.deviceService.getDevices(username);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Device> getAllDevices() {
        return this.deviceService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/add")
    @Transactional
    public Long addDevice(@RequestBody DeviceAddUpdateDTO deviceAddUpdateDTO) {
        return this.deviceService.addDevice(deviceAddUpdateDTO);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/update/{id}")
    public String updateDevice(@PathVariable Long id, @RequestBody DeviceAddUpdateDTO deviceAddUpdateDTO) {
        return this.deviceService.updateDevice(id, deviceAddUpdateDTO);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/delete/{id}")
    @Transactional
    public String deleteDevice(@PathVariable Long id) {
        return this.deviceService.deleteDevice(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/assign/{id}")
    public String assignDeviceToClient(@PathVariable Long id, @RequestBody AssignDeviceToClientDTO assignDeviceToClientDTO) {
        return this.deviceService.assignDeviceToClient(id, assignDeviceToClientDTO.getUsername());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/unassigned")
    public List<Device> getUnassignedDevices() {
        return this.deviceService.getUnassignedDevices();
    }
}
