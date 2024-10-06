package com.example.diploma.Model;

import java.time.LocalDate;

import javax.validation.constraints.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="person")
@Getter
@Setter
@Data
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="person_id")
    private Long person_id;

    @NotBlank
    @Size(max=30)
    @Column(name="name", nullable = false)
    private String name;

    @NotBlank
    @Size(max=30)
    @Column(name="surname", nullable = false)
    private String surname;

    @NotBlank
    @Size(max=40)
    @Column(name="password", nullable = false)
    private String password;

    @NotBlank
    @Size(max=100)
    @Column(name="email", nullable = false)
    private String email;

    @NotBlank
    @Size(max=20)
    @Column(name="number", nullable = false)
    private String number;

    @NotBlank
    @Size(max=100)
    @Column(name="address", nullable = false)
    private String address;

    @NotBlank
    @Size(max=10)
    @Column(name="role", nullable = false)
    private String role;

    @Column(name="dob", nullable = false)
    private LocalDate dob;

    @NotBlank
    @Size(max=30)
    @Column(name="state", nullable = false)
    private String state;

    @Column(name="profilePic")
    private String profilePic;

    @Column(name="seller_id")
    private Long seller_id;
}
