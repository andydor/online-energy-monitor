package com.example.sd_assignment1.services;

import com.example.sd_assignment1.dtos.request.DeviceAddUpdateDTO;
import com.example.sd_assignment1.entities.Client;
import com.example.sd_assignment1.entities.Device;
import com.example.sd_assignment1.entities.User;
import com.example.sd_assignment1.repositories.ClientRepository;
import com.example.sd_assignment1.repositories.DeviceRepository;
import com.example.sd_assignment1.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;

    public DeviceService(DeviceRepository deviceRepository, UserRepository userRepository, ClientRepository clientRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
    }

    public List<Device> getAll() {
        return deviceRepository.findAll();
    }

    public List<Device> getDevices(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            Optional<Client> client = clientRepository.findClientByUserId(user.get().getId());
            if (client.isPresent()) {
                return client.get().getDevices();
            }
        }
        return null;
    }

    public String updateDevice(Long id, DeviceAddUpdateDTO deviceAddUpdateDTO) {
        Optional<Device> device = deviceRepository.getDeviceById(id);
        System.out.println(deviceAddUpdateDTO);
        if(device.isPresent()) {


            System.out.println(device.get());
            device.get().setDescription(deviceAddUpdateDTO.getDescription());
            device.get().setLocation(deviceAddUpdateDTO.getLocation());
            device.get().setMaxEnergyConsumption(deviceAddUpdateDTO.getMaxEnergyConsumption());
            device.get().setAvgEnergyConsumption(deviceAddUpdateDTO.getAvgEnergyConsumption());
            deviceRepository.save(device.get());

//            Optional<Client> client = clientRepository.findClientByUserId(2L);
//            client.ifPresent(value -> value.getDevices().add(device.get()));
//            clientRepository.save(client.get());
            return "ok";
        }
        return "not-ok";
    }

    public String deleteDevice(Long id) {
        Optional<Device> device = deviceRepository.getDeviceById(id);

        if(device.isPresent()) {
            deviceRepository.deleteDeviceById(id);
            return "ok";
        }
        return "not-ok";
    }

    public Long addDevice(DeviceAddUpdateDTO deviceAddUpdateDTO) {
        Device device = new Device();
        device.setLocation(deviceAddUpdateDTO.getLocation());
        device.setDescription(deviceAddUpdateDTO.getDescription());
        device.setAvgEnergyConsumption(deviceAddUpdateDTO.getAvgEnergyConsumption());
        device.setMaxEnergyConsumption(deviceAddUpdateDTO.getMaxEnergyConsumption());
        return deviceRepository.save(device).getId();
    }

    public String assignDeviceToClient(Long id, String username) {
        Optional<Device> device = deviceRepository.getDeviceById(id);

        if(device.isPresent()) {
            Optional<User> user = userRepository.findByUsername(username);
            if (user.isPresent()) {
                user.get().getClient().getDevices().add(device.get());
                clientRepository.save(user.get().getClient());
                device.get().setClient(user.get().getClient());
                deviceRepository.save(device.get());
                return "ok";
            }
        }

        return "not-ok";
    }

    public List<Device> getUnassignedDevices() {
        List<Device> devices = deviceRepository.findAll();
        List<Device> res = new ArrayList<>();
        for(Device d: devices) {
            if(d.getClient() == null)
                res.add(d);
        }

        return res;
    }
}
