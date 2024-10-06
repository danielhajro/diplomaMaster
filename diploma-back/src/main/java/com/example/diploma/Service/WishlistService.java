package com.example.diploma.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.diploma.DTO.WishlistDTO;
import com.example.diploma.Model.Wishlist;

@Service
public interface WishlistService {

    //user wishlist check
    List<Wishlist> getAllWishlistByPersonId(Long person_id);
   
    //Cruds
    Wishlist addWishlist(WishlistDTO wishlistDTO, Long person_id, Long post_id);
    void deleteWishlist(Long wishlist_id);

}
