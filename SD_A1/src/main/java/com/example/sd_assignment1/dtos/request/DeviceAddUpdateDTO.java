package com.example.sd_assignment1.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DeviceAddUpdateDTO {
    private String description;
    private String location;
    private Long maxEnergyConsumption;
    private Long avgEnergyConsumption;
}
