package com.example.sd_assignment1.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SensorAddUpdateDTO {
    private String description;
    private Long maxValue;
}
