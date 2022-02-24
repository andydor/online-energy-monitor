package com.example.sd_assignment1.services;

import com.example.sd_assignment1.dtos.request.AddUserDTO;
import com.example.sd_assignment1.dtos.request.LoginRequestDTO;
import com.example.sd_assignment1.dtos.response.JwtResponseDTO;
import com.example.sd_assignment1.dtos.response.MessageResponseDTO;
import com.example.sd_assignment1.entities.Client;
import com.example.sd_assignment1.entities.ERole;
import com.example.sd_assignment1.entities.Role;
import com.example.sd_assignment1.entities.User;
import com.example.sd_assignment1.repositories.ClientRepository;
import com.example.sd_assignment1.repositories.RoleRepository;
import com.example.sd_assignment1.repositories.UserRepository;
import com.example.sd_assignment1.webSecurity.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, ClientRepository clientRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<JwtResponseDTO> validateLogin(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDTO(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    public ResponseEntity<MessageResponseDTO> signUp(AddUserDTO addUserDTO) {
        if (userRepository.existsByUsername(addUserDTO.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDTO("Error: Username is already taken!"));
        }

        // Create new user's account
        User user = new User(addUserDTO.getUsername(),
                encoder.encode(addUserDTO.getPassword()));

        Client client = new Client();
        client.setName(addUserDTO.getName());
        client.setAddress(addUserDTO.getAddress());
        client.setDateOfBirth(addUserDTO.getDateOfBirth());

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findRoleByRole(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        if(addUserDTO.isAdmin()) {
            Role adminRole = roleRepository.findRoleByRole(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            roles.add(adminRole);
        }
        else {
            roles.add(userRole);
        }

        user.setRoles(roles);
        userRepository.save(user);
        client.setUser(user);
        user.setClient(client);
        clientRepository.save(client);
        userRepository.save(user);
        return ResponseEntity
                .ok()
                .body(new MessageResponseDTO("Ok"));
    }
}
