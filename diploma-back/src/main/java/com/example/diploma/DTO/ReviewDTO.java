package com.example.diploma.DTO;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {

    @NotBlank
    private Long person_id;

    @NotBlank
    private Long post_id;

    @NotBlank
    @Min(1)
    @Max(5)
    private int rating;

    @NotBlank
    @Lob
    private String content;

}
