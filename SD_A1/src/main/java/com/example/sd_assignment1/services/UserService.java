package com.example.sd_assignment1.services;

import com.example.sd_assignment1.dtos.request.AddUserDTO;
import com.example.sd_assignment1.dtos.request.LoginRequestDTO;
import com.example.sd_assignment1.dtos.response.MessageResponseDTO;
import com.example.sd_assignment1.entities.*;
import com.example.sd_assignment1.dtos.request.UserUpdateRequestDTO;
import com.example.sd_assignment1.dtos.response.UserInfoResponseDTO;
import com.example.sd_assignment1.repositories.ClientRepository;
import com.example.sd_assignment1.repositories.RoleRepository;
import com.example.sd_assignment1.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, ClientRepository clientRepository, RoleRepository roleRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return this.userRepository.findByUsername(email);
    }

    /**
     * Create a Spring Security User object using email, password and authorities
     *
     * @param username user email
     * @return user object
     * @throws UsernameNotFoundException If there is no user found in the DB with that email
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("Invalid email or password");
        }
        return UserDetailsImpl.build(user.get());
    }

    public String updateUser(String username, UserUpdateRequestDTO newUser) {
        Optional<User> user = userRepository.findByUsername(username);
        System.out.println("-" + newUser.isAdmin());
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("Invalid email or password");
        } else {
            Optional<Client> client = clientRepository.findClientByUserId(user.get().getId());
            if (client.isPresent()) {
                Optional<Role> admin = roleRepository.findRoleByRole(ERole.ROLE_ADMIN);
                if (admin.isPresent()) {
                    System.out.println("-----" + admin.get().getRole());
                    if (newUser.isAdmin()) {
                        System.out.println("---" + newUser.isAdmin());
                        System.out.println("---" + user.get().getRoles());
                        user.get().getRoles().add(admin.get());
                        System.out.println("---" + user.get().getRoles());
                    } else if (!newUser.isAdmin()) {
                        System.out.println("-----" + newUser.isAdmin());
                        user.get().getRoles().remove(admin.get());
                    }
                    user.get().setUsername(newUser.getUsername());
                    client.get().setName(newUser.getName());
                    client.get().setAddress(newUser.getAddress());
                    client.get().setDateOfBirth(newUser.getDateOfBirth());
                    user.get().setClient(client.get());
                    userRepository.save(user.get());
                    client.get().setUser(user.get());
                    clientRepository.save(client.get());
                    System.out.println("-----" + user.get().getRoles());
                    return "ok";
                }
            }
        }
        return "not-ok";
    }

    public List<UserInfoResponseDTO> getUsersInfo() {
        List<User> users = userRepository.findAll();
        List<UserInfoResponseDTO> res = new ArrayList<>();

        for (User u : users) {
            UserInfoResponseDTO userInfoResponse = new UserInfoResponseDTO();
            Optional<Client> client = clientRepository.findClientByUserId(u.getId());
            if (client.isPresent()) {
                userInfoResponse.setUsername(u.getUsername());
                userInfoResponse.setName(client.get().getName());
                userInfoResponse.setAddress(client.get().getAddress());
                userInfoResponse.setDateOfBirth(client.get().getDateOfBirth());
                List<String> roles = new ArrayList<>();
                for (Role r : u.getRoles())
                    roles.add(r.getRole().name());
                userInfoResponse.setRoles(roles);
            } else {
                userInfoResponse.setUsername(u.getUsername());
                List<String> roles = new ArrayList<>();
                for (Role r : u.getRoles())
                    roles.add(r.getRole().name());
                userInfoResponse.setRoles(roles);
            }
            res.add(userInfoResponse);
        }

        return res;
    }

    public String deleteUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            Optional<Client> client = clientRepository.findClientByUserId(user.get().getId());
            if (client.isPresent()) {
                clientRepository.delete(client.get());
            }
            userRepository.delete(user.get());
            return "ok";
        }
        return "not-ok";
    }

    public String updatePassword(LoginRequestDTO loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
        if (user.isPresent()) {
            user.get().setPassword(loginRequest.getPassword());
            userRepository.save(user.get());
            return "ok";
        }
        return "not-ok";
    }
}
