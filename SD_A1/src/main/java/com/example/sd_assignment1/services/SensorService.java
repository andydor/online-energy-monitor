package com.example.sd_assignment1.services;

import com.example.sd_assignment1.dtos.request.DeviceAddUpdateDTO;
import com.example.sd_assignment1.dtos.request.SensorAddUpdateDTO;
import com.example.sd_assignment1.entities.Client;
import com.example.sd_assignment1.entities.Device;
import com.example.sd_assignment1.entities.Sensor;
import com.example.sd_assignment1.entities.User;
import com.example.sd_assignment1.repositories.DeviceRepository;
import com.example.sd_assignment1.repositories.SensorRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SensorService {
    private final DeviceRepository deviceRepository;
    private final SensorRepository sensorRepository;

    public SensorService(DeviceRepository deviceRepository, SensorRepository sensorRepository) {
        this.deviceRepository = deviceRepository;
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> getAll() {
        return sensorRepository.findAll();
    }

    public Sensor getSensorForDevice(Long deviceId) {
        Optional<Device> device = deviceRepository.findById(deviceId);
        return device.map(Device::getSensor).orElse(null);
    }

    public Long addSensor(SensorAddUpdateDTO sensorAddUpdateDTO) {
        Sensor sensor = new Sensor();
        sensor.setDescription(sensorAddUpdateDTO.getDescription());
        sensor.setMaxValue(sensorAddUpdateDTO.getMaxValue());
        return sensorRepository.save(sensor).getId();
    }

    public String updateSensor(Long id, SensorAddUpdateDTO sensorAddUpdateDTO) {
        Optional<Sensor> sensor = sensorRepository.getSensorById(id);

        if(sensor.isPresent()) {
            sensor.get().setDescription(sensorAddUpdateDTO.getDescription());
            sensor.get().setMaxValue(sensorAddUpdateDTO.getMaxValue());
            sensorRepository.save(sensor.get());
            return "ok";
        }
        return "not-ok";
    }

    public String deleteSensor(Long id) {
        Optional<Sensor> sensor = sensorRepository.getSensorById(id);

        if(sensor.isPresent()) {
            sensorRepository.deleteSensorById(id);
            return "ok";
        }
        return "not-ok";
    }

    public List<Sensor> getUnassignedSensors() {
        List<Sensor> sensors = sensorRepository.findAll();
        List<Sensor> res = new ArrayList<>();
        for(Sensor s: sensors) {
            if(s.getDevice() == null)
                res.add(s);
        }

        return res;
    }

    public String assignSensorToDevice(Long id, Long sensorId) {
        Optional<Sensor> sensor = sensorRepository.getSensorById(sensorId);

        if(sensor.isPresent()) {
            Optional<Device> device = deviceRepository.findById(id);
            if (device.isPresent()) {
                device.get().setSensor(sensor.get());
                deviceRepository.save(device.get());
                sensor.get().setDevice(device.get());
                sensorRepository.save(sensor.get());
                return "ok";
            }
        }

        return "not-ok";
    }
}
