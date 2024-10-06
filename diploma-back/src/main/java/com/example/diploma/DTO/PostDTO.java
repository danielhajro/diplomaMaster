package com.example.diploma.DTO;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {

    @NotBlank
    private String title;

    @NotBlank
    @Lob
    private String content;

    @NotNull
    private String sell_price;

    @NotNull
    private LocalDateTime timestamp;

    @NotNull
    private Long seller_id;

    @NotNull
    private Long car_id;

}
