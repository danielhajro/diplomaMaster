package com.example.diploma.DTO;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDTO {
    @NotNull
    private LocalDateTime order_date;

    @NotBlank
    private String payment_type;

    @NotBlank
    private Long person_id;

    @NotBlank
    private Long seller_id;

    @NotBlank
    private Long post_id;

    @NotNull
    private String status;
}
