package com.example.diploma.Model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="review")
@Data
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private Long review_id;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Person person_id;

    @ManyToOne
    @JoinColumn(name="post_id", nullable = false)
    private Post post_id;

    @NotBlank
    @Min(1)
    @Max(5)
    @Column(name="rating")
    private int rating;

    @Column(name="content")
    @Lob
    private String content;
}

