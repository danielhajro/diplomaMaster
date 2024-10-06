package com.example.diploma.DTO;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarsDTO {

    @Min(0)
    private int mileage;

    @NotBlank
    @Size(max=100)
    private String make;

    @NotBlank
    @Size(max=100)
    private String model;

    @NotBlank
    @Size(max=100)
    private String fuel;

    @NotBlank
    @Size(max=100)
    private String gear;

    @Size(max=100)
    private String offer_type;

    @Min(0)
    private int price;

    @Min(0)
    @Max(9999)
    private int hp;

    @Min(1970)  
    private int year;

    @NotBlank
    private Long person_id;
}
