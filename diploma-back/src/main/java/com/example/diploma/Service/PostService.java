package com.example.diploma.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.diploma.DTO.PostDTO;
import com.example.diploma.Model.Post;
@Service
public interface PostService {

    //admin get ALL POST
    List<Post> getAllPosts();
    
    //Search for admin and users
    List<Post> seachPostByTitle(String title);
    List<Post> findPostBySellerId(Long seller_id);
    List<Post> getRecentPost(Long seller_id);
    List<Post> getOtherPost(Long seller_id);

    Post getPostId(Long post_id);
    
    //Cruds
    Post createPost(PostDTO postDTO, Long person_id,Long car_id);
    Post updatePost(Long post_id, PostDTO postDTO);
    void deletePost(Long post_id);

}
