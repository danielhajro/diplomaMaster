package com.example.diploma.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.diploma.Model.Review;

@Repository
public interface ReviewRepository  extends JpaRepository<Review, Long>{

    @Query(value="Select r.* From review r where r.person_id=:person_id ",nativeQuery=true)
    List<Review> findAllReviewsFromPersonId(@Param("person_id") Long person_id);

    @Query(value="Select r.* from review r where r.review_id=:review_id", nativeQuery = true)
    Review findReviewById(@Param("review_id") Long review_id);

    @Query(value = "Select r.* from review r where r.post_id=:post_id", nativeQuery = true)
    List <Review> findPostReviews(@Param("post_id") Long post_id);

}
