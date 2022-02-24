package com.example.sd_assignment1.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "devices")
public class Device {
    // TODO: change to UUID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String location;

    private Long maxEnergyConsumption;

    private Long avgEnergyConsumption;

    @ManyToOne
    @JoinColumn(name="client_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Client client;

    @OneToOne(fetch = FetchType.EAGER,
            cascade = CascadeType.MERGE,
            mappedBy = "device")
    @JsonManagedReference
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Sensor sensor;
}
