package com.example.sd_assignment1.controllers;

import com.example.sd_assignment1.entities.*;
import com.example.sd_assignment1.repositories.ClientRepository;
import com.example.sd_assignment1.repositories.DeviceRepository;
import com.example.sd_assignment1.repositories.RoleRepository;
import com.example.sd_assignment1.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/autoconfig")
public class ConfigDatabaseController {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping
    public void config() {
        Role user_role = new Role();
        user_role.setRole(ERole.ROLE_USER);

        Role admin_role = new Role();
        admin_role.setRole(ERole.ROLE_ADMIN);

        roleRepository.save(user_role);
        roleRepository.save(admin_role);

        Set<Role> roles = new HashSet<>();
        roles.add(user_role);
        roles.add(admin_role);

//        User admin = new User();
//        admin.setUsername("admin");
//        admin.setPassword("admin");
//        admin.setRoles(roles);

        User admin1 = new User();
        admin1.setUsername("admin2");
        admin1.setPassword(encoder.encode("admin2"));
        admin1.setRoles(roles);

        userRepository.save(admin1);
        Optional<User> admin_user = userRepository.findByUsername("admin1");

        Client client_admin = new Client();
        client_admin.setName("admin2");
        client_admin.setAddress("aaa");
        client_admin.setUser(admin_user.get());
        clientRepository.save(client_admin);

        Optional<Client> clientOptional = clientRepository.findClientByUserId(admin_user.get().getId());
        admin_user.get().setClient(clientOptional.get());
        userRepository.save(admin_user.get());
    }

    @GetMapping
    @RequestMapping("/devices")
    public void configDevices() {
        Optional<Client> clientOptional = clientRepository.findById(1L);
        if(clientOptional.isPresent()) {
            Device device = new Device();
            device.setDescription("Temperature Sensor");
            device.setLocation("Nu ma innebuni");
            device.setMaxEnergyConsumption(100L);
            device.setAvgEnergyConsumption(75L);
            device.setId(1L);
            deviceRepository.save(device);
            clientOptional.get().getDevices().add(device);
            clientRepository.save(clientOptional.get());

            Optional<User> user = userRepository.findById(clientOptional.get().getUser().getId());
            user.get().setClient(clientOptional.get());
            userRepository.save(user.get());
        }
    }
}
