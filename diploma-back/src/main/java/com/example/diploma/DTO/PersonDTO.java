package com.example.diploma.DTO;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonDTO {

    
    @NotBlank
    @Size(max=30)
    private String name;

    @NotBlank
    @Size(max=30)
    private String surname;

    @NotBlank
    @Size(max=40)
    private String password;

    @NotBlank
    @Size(max=100)
    private String email;

    @NotBlank
    @Size(max=20)
    private String number;

    @NotBlank
    @Size(max=100)
    private String address;

    @NotBlank
    @Size(max=10)
    private String role;

    @NotBlank
    private LocalDate dob;

    @NotBlank
    @Size(max=30)
    private String state;

    @NotBlank
    private String profilePic;

    @NotBlank
    private Long seller_id;

}
