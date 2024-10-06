package com.example.diploma.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.diploma.DTO.WishlistDTO;
import com.example.diploma.Model.Person;
import com.example.diploma.Model.Post;
import com.example.diploma.Model.Wishlist;
import com.example.diploma.Repository.PersonRepository;
import com.example.diploma.Repository.PostRepository;
import com.example.diploma.Repository.WishlistRepository;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    public WishlistServiceImpl(WishlistRepository wishlistRepository, PersonRepository personRepository, PostRepository postRepository){
        this.personRepository=personRepository;
        this.postRepository=postRepository;
        this.wishlistRepository=wishlistRepository;
    }

    @Override
    public List<Wishlist> getAllWishlistByPersonId(Long person_id) {
        return wishlistRepository.findAllWishlistByPersonId(person_id);
    }

    @Override
    public Wishlist addWishlist(WishlistDTO wishlistDTO, Long person_id, Long post_id) {
        Wishlist wishlist=new Wishlist();
        
        Person person = personRepository.findById(person_id).orElseThrow(() -> new RuntimeException("Person not found"));
        wishlist.setPerson_id(person);

        Post post= postRepository.findById(post_id).orElseThrow(() -> new RuntimeException("Post not found"));
        wishlist.setPost_id(post);

        return wishlistRepository.save(wishlist);

    }

    @Override
    public void deleteWishlist(Long wishlist_id) {
        if (wishlistRepository.existsById(wishlist_id)){
            wishlistRepository.deleteById(wishlist_id);
        }else{
            throw new RuntimeException("Wishlist not found with ID: " + wishlist_id);
        }
    }

}
