package com.example.diploma.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.diploma.Model.Wishlist;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist,Long>{

     @Query(value = "Select w.* from wishlist w where w.person_id=:person_id", nativeQuery = true)    
    List<Wishlist> findAllWishlistByPersonId(@Param("person_id") Long person_id);

}
