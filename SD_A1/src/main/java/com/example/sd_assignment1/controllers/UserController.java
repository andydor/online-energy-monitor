package com.example.sd_assignment1.controllers;

import com.example.sd_assignment1.dtos.request.LoginRequestDTO;
import com.example.sd_assignment1.dtos.request.UserUpdateRequestDTO;
import com.example.sd_assignment1.dtos.response.UserInfoResponseDTO;
import com.example.sd_assignment1.dtos.response.UserLoginResponseDTO;
import com.example.sd_assignment1.entities.User;
import com.example.sd_assignment1.services.UserService;
import com.example.sd_assignment1.webSecurity.JwtUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    private final JwtUtils jwtUtils;

    public UserController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserLoginResponseDTO getUserName(@RequestHeader(name="Authorization") String token) {
        String email = jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        Optional<User> user = this.userService.findByEmail(email);
        return new UserLoginResponseDTO(user.get().getUsername(), user.get().getRoles());
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @RequestMapping("/getInfo")
    public List<UserInfoResponseDTO> getUsersInfo() {
        return this.userService.getUsersInfo();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/update/{username}")
    public String updateUser(@PathVariable String username, @RequestBody UserUpdateRequestDTO userUpdateRequest) {
        return this.userService.updateUser(username, userUpdateRequest);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/delete/{username}")
    public String deleteUser(@PathVariable String username) {
        return this.userService.deleteUser(username);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/updatePassword")
    public String updatePassword(@RequestBody LoginRequestDTO loginRequest) {
        return this.userService.updatePassword(loginRequest);
    }
}