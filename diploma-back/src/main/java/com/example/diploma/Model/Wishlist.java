package com.example.diploma.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="wishlist")
@Data
@Getter
@Setter
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="wishlist_id")
    private Long wishlist_id;

    @ManyToOne
    @JoinColumn(name = "person_id", nullable = false)
    private Person person_id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post_id;

}
