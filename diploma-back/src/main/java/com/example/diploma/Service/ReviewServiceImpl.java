package com.example.diploma.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.diploma.DTO.ReviewDTO;
import com.example.diploma.Model.Person;
import com.example.diploma.Model.Post;
import com.example.diploma.Model.Review;
import com.example.diploma.Repository.PersonRepository;
import com.example.diploma.Repository.PostRepository;
import com.example.diploma.Repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired 
    private PostRepository postRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, PersonRepository personRepository, PostRepository postRepository){
        this.reviewRepository=reviewRepository;
        this.personRepository=personRepository;
        this.postRepository=postRepository;
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getAllReviewsFromPersonId(Long person_id) {
        return reviewRepository.findAllReviewsFromPersonId(person_id);
    }

    @Override
    public Review getReviewById(Long review_id){
        return reviewRepository.findReviewById(review_id);
    }

    @Override
    public Review addReview(ReviewDTO reviewDTO, Long person_id, Long post_id) {
        Review review = new Review();
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());

        Person person = personRepository.findById(person_id).orElseThrow(() -> new RuntimeException("Person not found."));
        review.setPerson_id(person);

        Post post = postRepository.findById(post_id).orElseThrow(() -> new RuntimeException("Post not found"));
        review.setPost_id(post);
        
        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(Long review_id, ReviewDTO reviewDTO) {
        Optional<Review> optionalReview = reviewRepository.findById(review_id);
        if(optionalReview.isPresent()){
            Review existingReview = optionalReview.get();
            existingReview.setContent(reviewDTO.getContent());
            existingReview.setRating(reviewDTO.getRating());

            return reviewRepository.save(existingReview);
        }else{
            throw new RuntimeException("Review not found with id" + review_id);
        }
    }

    @Override
    public void deleteReview(Long review_id) {
        if(reviewRepository.existsById(review_id)){
            reviewRepository.deleteById(review_id);
        }else{
            throw new RuntimeException("Review not found with id: " + review_id);
        }
    }

    @Override
    public List<Review> getPostReviews(Long post_id) {
        return reviewRepository.findPostReviews(post_id);
    }

}
