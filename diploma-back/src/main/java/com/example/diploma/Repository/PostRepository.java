package com.example.diploma.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.diploma.Model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value="SELECT * FROM POST where title=:title", nativeQuery= true)
    List<Post> findPostByTitle(@Param("title") String title);

    @Query(value = "Select * from post p where p.seller_id=:seller_id", nativeQuery = true)
    List<Post> findPostBySellerId(@Param("seller_id") Long seller_id);

    @Query(value = "Select p.seller_id From Post p where post_id=(:post_id)",nativeQuery = true)
    Long sellerIdFromPostId(@Param("post_id") Long post_id);

    @Query(value= "Select p.* from Post p where seller_id!=(:seller_id) order by p.post_id desc limit 4", nativeQuery = true)
    List<Post> findRecentPost(@Param("seller_id") Long seller_id);

    @Query(value = "Select * from post p where p.seller_id!=:seller_id", nativeQuery = true)
    List<Post> findOtherPost(@Param("seller_id") Long seller_id);

    @Query(value= "Select * from post p where p.post_id=:post_id", nativeQuery = true)
    Post findPostById(@Param("post_id") Long post_id);
}
