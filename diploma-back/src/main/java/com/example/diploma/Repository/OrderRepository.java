package com.example.diploma.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.diploma.Model.Order;

import jakarta.transaction.Transactional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query(value = "SELECT o.order_id, o.order_date, o.payment_type, o.status, o.person_id, o.post_id, o.seller_id FROM orders o WHERE o.person_id = :person_id", nativeQuery = true)
    List<Order> findOrdersByPersonId(@Param("person_id") Long person_id);
    

    @Query(value = " Select * from orders o  WHERE o.seller_id = :seller_id", nativeQuery = true)
    List<Order> getAllOrdersFromSellerId(@Param("seller_id") Long seller_id);

    @Query(value="Select * from orders o where o.order_id=:order_id", nativeQuery = true)
    Order findOrderById(@Param("order_id") Long order_id);

    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.status = 'Refused' WHERE o.post_id.post_id = :post_id AND o.order_id != :order_id AND o.status = 'Pending'")
    void refusePendingOrdersForPost(@Param("post_id") Long post_id, @Param("order_id") Long order_id);

}
