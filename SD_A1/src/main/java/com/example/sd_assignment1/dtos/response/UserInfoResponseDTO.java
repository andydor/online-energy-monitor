package com.example.sd_assignment1.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserInfoResponseDTO {
    private String username;
    private String name;
    private Date dateOfBirth;
    private String address;
    private List<String> roles;
}
