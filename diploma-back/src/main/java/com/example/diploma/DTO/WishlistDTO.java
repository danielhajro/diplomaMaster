package com.example.diploma.DTO;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class WishlistDTO {

    @NotNull
    private Long person_id;

    @NotNull
    private Long post_id;

}
