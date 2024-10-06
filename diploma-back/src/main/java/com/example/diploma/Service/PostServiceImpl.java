package com.example.diploma.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.diploma.DTO.PostDTO;
import com.example.diploma.Model.Cars;
import com.example.diploma.Model.Post;
import com.example.diploma.Repository.CarsRepository;
import com.example.diploma.Repository.PersonRepository;
import com.example.diploma.Repository.PostRepository;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, PersonRepository personRepository, CarsRepository carsRepository){
        this.postRepository = postRepository;
        this.personRepository = personRepository;
        this.carsRepository = carsRepository;
    }


    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> seachPostByTitle(String title) {
        return postRepository.findPostByTitle(title);
    }

    @Override
    public List<Post> findPostBySellerId(Long seller_id) {
        return postRepository.findPostBySellerId(seller_id);
    }

    @Override
    public List<Post> getRecentPost(Long seller_id){
        return postRepository.findRecentPost(seller_id);
    }

    @Override
    public List<Post> getOtherPost(Long seller_id){
        return postRepository.findOtherPost(seller_id);
    }

    @Override
    public Post getPostId(Long post_id){
        return postRepository.findPostById(post_id);
    }

    @Override
    public Post createPost(PostDTO postDTO, Long person_id, Long car_id) {
        Post post = new Post();
        post.setContent(postDTO.getContent());
        post.setSell_price(postDTO.getSell_price());
        post.setTimestamp(postDTO.getTimestamp());
        post.setTitle(postDTO.getTitle());

        Long seller= personRepository.getSellerId(person_id);
        post.setSeller_id(seller);
    
        Cars car = carsRepository.findById(car_id)
                        .orElseThrow(() -> new RuntimeException("Car not found"));
        post.setCar_id(car);
    
        return postRepository.save(post);
    }
    

    @Override
    public Post updatePost(Long post_id, PostDTO postDTO) {
        Optional<Post> optionalPost=postRepository.findById(post_id);
        if(optionalPost.isPresent()){
            Post existingPost = optionalPost.get();
            existingPost.setContent(postDTO.getContent());
            existingPost.setSell_price(postDTO.getSell_price());
            existingPost.setTimestamp(postDTO.getTimestamp());
            existingPost.setTitle(postDTO.getTitle());

            return postRepository.save(existingPost);
        }else{
            throw new RuntimeException("Post not found with id " + post_id);
        }
    }

    @Override
    public void deletePost(Long post_id) {
        if ( postRepository.existsById(post_id)){
            postRepository.deleteById(post_id);
        }else{
            throw new RuntimeException("Post not found with id : " + post_id);
        }
    }

}
