package com.example.sd_assignment1.dtos.response;

import com.example.sd_assignment1.entities.Role;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class UserLoginResponseDTO {
    @NotNull
    private String username;
    @NotNull
    private List<String> roles;

    public UserLoginResponseDTO(String username, Set<Role> roles) {
        this.username = username;
        this.roles = new ArrayList<>();
        for (Role role : roles) {
            this.roles.add(role.getRole().toString());
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
