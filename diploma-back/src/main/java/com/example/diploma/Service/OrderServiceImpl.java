package com.example.diploma.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.diploma.DTO.OrderDTO;
import com.example.diploma.Model.Cars;
import com.example.diploma.Model.Order;
import com.example.diploma.Model.Person;
import com.example.diploma.Model.Post;
import com.example.diploma.Repository.CarsRepository;
import com.example.diploma.Repository.OrderRepository;
import com.example.diploma.Repository.PersonRepository;
import com.example.diploma.Repository.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CarsRepository carsRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, PersonRepository personRepository, PostRepository postRepository, CarsRepository carsRepository){
        this.orderRepository=orderRepository;
        this.personRepository=personRepository;
        this.postRepository=postRepository;
        this.carsRepository=carsRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getAllOrdersFromPersonId(Long person_id) {
        return orderRepository.findOrdersByPersonId(person_id);
    }

    @Override
    public List<Order> getAllOrdersFromSellerId(Long seller_id) {
        return orderRepository.getAllOrdersFromSellerId(seller_id);
    }

    @Override
    public Order newOrder(OrderDTO orderDTO,Long person_id,Long post_id) {
        Order order = new Order();
        order.setOrder_date(orderDTO.getOrder_date());
        order.setPayment_type(orderDTO.getPayment_type());
        order.setStatus(orderDTO.getStatus());

        Person person=personRepository.findById(person_id).orElseThrow(() -> {
            System.err.println("Person with ID " + person_id + " not found");
            return new RuntimeException("Person Not Found");
        });
        order.setPerson_id(person);

        Post post= postRepository.findById(post_id) .orElseThrow(() -> {
            System.err.println("Post with ID " + post_id + " not found");
            return new RuntimeException("Post not Found");
        });
        order.setPost_id(post);

        Long seller=postRepository.sellerIdFromPostId(post_id);
        System.out.println("Retrieved seller_id: " + seller);
        order.setSeller_id(seller);
        

        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Long order_id, OrderDTO orderDTO) {
        Optional<Order> optionalOrder= orderRepository.findById(order_id);
        if(optionalOrder.isPresent()){
            Order updateOrder=optionalOrder.get();
            updateOrder.setStatus(orderDTO.getStatus());
            updateOrder.setPayment_type(orderDTO.getPayment_type());

            return orderRepository.save(updateOrder);
        }else{
            throw new RuntimeException("Order not Found with ID: " + order_id);
        }

    }

    @Override
    public void deleteOrder(Long order_id) {
        if(orderRepository.existsById(order_id)){
            orderRepository.deleteById(order_id);
        }else{
            throw new RuntimeException("Order not found with ID: " + order_id);
        }
    }

    @Override
    public Order getOrderById(Long order_id) {
        return orderRepository.findOrderById(order_id);
    }

        
    @Override
    @Transactional
    public void acceptOrder(Long order_id) {
        // Retrieve the order
        Order order = orderRepository.findById(order_id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    
        // Update order status to 'Accepted'
        order.setStatus("Accepted");
        orderRepository.save(order);  // Ensure the order status is saved
    
        // Retrieve the related post
        Long post_id = order.getPost_id().getPost_id();  // Make sure this is the ID, not a Post object
        Post post = postRepository.findById(post_id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    
        // Retrieve the person who placed the order
        Long person_id = order.getPerson_id().getPerson_id();  // Ensure this is treated as an ID
        Person person = personRepository.findById(person_id)
                .orElseThrow(() -> new RuntimeException("Person not found"));
    
        // Find the car associated with the post
        Optional<Cars> optionalCars = carsRepository.findById(post.getCar_id().getCar_id());
        if (optionalCars.isPresent()) {
            Cars existingCar = optionalCars.get();
    
            // Transfer car ownership to the person who placed the order
            existingCar.setPerson_id(person);
            
            // Update the car's price to the post's selling price
            String new_price = post.getSell_price();
            carsRepository.updatePriceById(existingCar.getCar_id(), new_price);
            carsRepository.save(existingCar);  // Save the updated car ownership
    
        } else {
            throw new RuntimeException("Car not found with id " + post.getCar_id().getCar_id());
        }
    
        // Refuse all other pending orders for the same post
        orderRepository.refusePendingOrdersForPost(post.getPost_id(), order_id);
        // Make sure post_id is correctly passed as a Long
    }
    


    

    @Override
    public void refuseOrder(Long order_id) {
        Order order = orderRepository.findById(order_id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Update the order status to 'Refused'
        order.setStatus("Refused");
        orderRepository.save(order);
    }

}
