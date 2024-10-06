package com.example.diploma.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.diploma.DTO.ReviewDTO;
import com.example.diploma.Model.Review;

@Service
public interface ReviewService {

    List<Review> getAllReviews();
    List<Review> getAllReviewsFromPersonId(Long person_id);
    Review getReviewById(Long review_id);
    List <Review> getPostReviews(Long post_id);

    Review addReview(ReviewDTO reviewDTO, Long person_id, Long post_id);
    Review updateReview(Long review_id, ReviewDTO reviewDTO);
    void deleteReview(Long review_id);

}
