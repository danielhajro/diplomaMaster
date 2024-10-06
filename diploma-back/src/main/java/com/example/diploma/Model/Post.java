package com.example.diploma.Model;

import lombok.Data;
import jakarta.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long post_id;

    @NotBlank
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Column(name = "sell_price", nullable = false)
    private String sell_price;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @NotBlank
    @Column(name="seller_id", nullable = false)
    private Long seller_id;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Cars car_id;

}

