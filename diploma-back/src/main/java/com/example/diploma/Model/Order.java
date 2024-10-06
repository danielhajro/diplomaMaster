package com.example.diploma.Model;

import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders")
@Data
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private Long order_id;

    @NotNull
    @Column(name="order_date", nullable = false)
    private LocalDateTime order_date;

    @NotBlank
    @Column(name="payment_type",nullable = false)
    private String payment_type;

    @ManyToOne
    @JoinColumn(name="person_id", nullable = false)
    private Person person_id;

    @NotBlank
    @Column(name="seller_id",nullable = false)
    private Long seller_id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post_id;

    @NotNull
    @Column(name="status", nullable = false)
    private String status;

}
