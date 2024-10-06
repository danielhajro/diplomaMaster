package com.example.diploma.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import javax.validation.constraints.*;

@Entity
@Table(name="cars")
@Data
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="car_id")
    private Long car_id;

    @Min(0)
    @Column(name="mileage", nullable = false)
    private int mileage;

    @NotBlank
    @Size(max=100)
    @Column(name="make", nullable = false)
    private String make;

    @NotBlank
    @Size(max=100)
    @Column(name="model", nullable = false)
    private String model;

    @NotBlank
    @Size(max=100)
    @Column(name="fuel", nullable = false)
    private String fuel;

    @NotBlank
    @Size(max=100)
    @Column(name="gear", nullable = false)
    private String gear;

    @Size(max=100)
    @Column(name="offer_type")
    private String offer_type;

    @Min(0)
    @Column(name="price")
    private int price;

    @Min(0)
    @Max(9999)
    @Column(name="hp")
    private int hp;

    @Min(1970)  
    @Column(name="year")
    private int year;

    @ManyToOne
    @JoinColumn(name="person_id")
    private Person person_id;
}