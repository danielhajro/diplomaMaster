package com.example.diploma.Service;

import java.util.List;

import com.example.diploma.DTO.OrderDTO;
import com.example.diploma.Model.Order;

public interface OrderService {

    //Admin Order Check
    List<Order> getAllOrders();

    //Person ID Check
    List<Order> getAllOrdersFromPersonId(Long person_id);

    //Seller ID check 
    List<Order> getAllOrdersFromSellerId(Long seller_id);
    //Get order by ID
    Order getOrderById(Long order_id);

    //Actions
    public void refuseOrder(Long order_id);
    public void acceptOrder(Long order_id);

    //Cruds for Order
    Order newOrder(OrderDTO orderDTO,Long person_id,Long post_id);
    Order updateOrder(Long order_id,OrderDTO orderDTO);
    void deleteOrder(Long order_id);

}
