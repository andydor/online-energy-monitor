package com.example.sd_assignment1.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AddUserDTO {
    private String username;
    private String password;
    private String name;
    private Date dateOfBirth;
    private String address;
    private boolean admin;
}
