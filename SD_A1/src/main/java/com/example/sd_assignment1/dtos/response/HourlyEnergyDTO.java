package com.example.sd_assignment1.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HourlyEnergyDTO {
    private String timestamp;
    private Double value;
}
