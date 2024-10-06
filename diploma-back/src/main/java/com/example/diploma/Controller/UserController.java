package com.example.diploma.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.diploma.DTO.CarsDTO;
import com.example.diploma.DTO.OrderDTO;
import com.example.diploma.DTO.PersonDTO;
import com.example.diploma.DTO.PostDTO;
import com.example.diploma.DTO.ReviewDTO;
import com.example.diploma.DTO.WishlistDTO;
import com.example.diploma.Model.Cars;
import com.example.diploma.Model.Order;
import com.example.diploma.Model.Person;
import com.example.diploma.Model.Post;
import com.example.diploma.Model.Review;
import com.example.diploma.Model.Wishlist;
import com.example.diploma.Repository.PersonRepository;
import com.example.diploma.Service.CarService;
import com.example.diploma.Service.OrderService;
import com.example.diploma.Service.PersonService;
import com.example.diploma.Service.PostService;
import com.example.diploma.Service.ReviewService;
import com.example.diploma.Service.WishlistService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.util.StringUtils;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private PersonService personService;

    @Autowired
    private PostService postService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private WishlistService wishlistService;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private CarService carService;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    public UserController(PersonService personService, PostService postService, ReviewService reviewService,
            WishlistService wishlistService, OrderService orderService, CarService carService) {
        this.personService = personService;
        this.postService = postService;
        this.wishlistService = wishlistService;
        this.orderService = orderService;
        this.carService = carService;
        this.reviewService = reviewService;
    }

    // CRUDS FOR USER OPERATIONS ( TESTED AND WORK FINE )
    @PostMapping("/addPerson")
    public ResponseEntity<Map<String, String>> addUser(@Valid @RequestBody PersonDTO personDTO) {
        try {
            if (!StringUtils.hasText(personDTO.getProfilePic())) {
                personDTO.setProfilePic("utilities/photos/profile.jpg");
            }
            if (personDTO.getRole() == null || personDTO.getRole().trim().isEmpty()) {
                personDTO.setRole("User");
            }
            personService.addUser(personDTO);

            // Return a JSON response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Person added successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error adding user: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");

            if (!StringUtils.hasText(email) || !StringUtils.hasText(password)) {
                throw new IllegalArgumentException("Email and password must not be empty");
            }

            // Retrieve user from the database by email
            Optional<Person> userOpt = personRepository.personLoginEmail(email);

            if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }

            // Login successful
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            
            Person person = userOpt.get();
            response.put("person_id", person.getPerson_id().toString());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid input: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

        
    @PutMapping("/updateUser/{person_id}")
    public ResponseEntity<String> updateUser(@PathVariable Long person_id, @Valid @RequestBody PersonDTO personDTO) {
        personService.updatePerson(person_id, personDTO);
        return ResponseEntity.ok("Updated successfully");
    }

    @DeleteMapping("/deleteUser/{person_id}")
    public ResponseEntity<String> deletePerson(@PathVariable Long person_id) {
        try {
            personService.deletePerson(person_id);
            return ResponseEntity.ok("Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting user: " + e.getMessage());
        }
    }

    @GetMapping("/personInfo/{person_id}")
    public Person getPerson(@PathVariable("person_id") Long person_id) {
        return personService.getPersonInfo(person_id);
    }

    @GetMapping("/getPersonInfo/{person_id}")
    public Person getPersonById(@PathVariable Long person_id){
        return personRepository.getPersonById(person_id);
    }

    @GetMapping("/seller_id/{person_id}")
    public Long getSeller_id(@PathVariable Long person_id){
        return personRepository.getSellerId(person_id);
    }

    @GetMapping("/getPerson/{seller_id}")
    public Person getPersonFromSellerId(@PathVariable Long seller_id){
        return personRepository.getPersonFromSellerId(seller_id);
    }

    // CRUDS FOR CAR OPERATIONS ( TESTE AND WORK FINE )
    @PostMapping("/addCar/{person_id}")
    public ResponseEntity<String> addCar(@PathVariable Long person_id, @RequestBody CarsDTO carDTO) {
        try {
            carDTO.setPerson_id(person_id);
            carService.createCars(carDTO);
            return ResponseEntity.ok("Car added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding car: " + e.getMessage());
        }
    }

    @PutMapping("updateCar/{car_id}")
    public ResponseEntity<String> updateCar(@PathVariable Long car_id, @RequestBody CarsDTO carsDTO) {
        carService.updateCars(car_id, carsDTO);
        return ResponseEntity.ok("Car Updated");
    }

    @DeleteMapping("/deleteCar/{car_id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long car_id) {
        try {
            carService.deleteCar(car_id);
            return ResponseEntity.ok("Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting car: " + e.getMessage());
        }
    }

    @GetMapping("/userCars/{person_id}")
    public ResponseEntity<List<Cars>> getUserCar(@PathVariable Long person_id) {
        List<Cars> cars=carService.getUserCarById(person_id);
        return ResponseEntity.ok(cars);
    }


    @GetMapping("/userCars/getCarById/{car_id}")
    public ResponseEntity<Cars> getCarById(@PathVariable Long car_id){
        Cars car= carService.getCarById(car_id);
        return ResponseEntity.ok(car);
    }
    

    // CRUDS FOR POST OPERATIONS ( TESTED AND WORKS FINE AF)
    @PostMapping("/newPost/{person_id}/{car_id}")
    public ResponseEntity<String> addPost(@PathVariable Long person_id, @PathVariable Long car_id,
            @RequestBody PostDTO postDTO) {
        try {
            postService.createPost(postDTO, person_id, car_id);
            return ResponseEntity.ok("Post added.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding post: " + e.getMessage());
        }
    }

    @PutMapping("/updatePost/{post_id}")
    public ResponseEntity<String> updatePost(@PathVariable Long post_id, @RequestBody PostDTO postDTO) {
        try {
            postService.updatePost(post_id, postDTO);
            return ResponseEntity.ok("Post Updated");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating post: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletePost/{post_id}")
    public ResponseEntity<String> deletePost(@PathVariable Long post_id) {
        try {
            postService.deletePost(post_id);
            return ResponseEntity.ok("Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting post: " + e.getMessage());
        }
    }

    @GetMapping("/userPost/{seller_id}")
    public ResponseEntity<List<Post>> getUserPost(@PathVariable Long seller_id){
        List<Post> posts=postService.findPostBySellerId(seller_id);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/recentPost/{person_id}")
    public ResponseEntity<List<Post>> getRecentPost(@PathVariable Long person_id) {
        if (person_id == null) {
            return ResponseEntity.badRequest().body(null); 
        }
        Long seller_id=personRepository.getSellerId(person_id);
        List<Post> recentPosts=postService.getRecentPost(seller_id);
        return ResponseEntity.ok(recentPosts);
    }

    @GetMapping("/otherPost/{seller_id}")
    public ResponseEntity<List<Post>> getOtherPosts(@PathVariable Long seller_id){
        List <Post> posts=postService.getOtherPost(seller_id);
        return ResponseEntity.ok(posts);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getPost/{post_id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long post_id){
        Post post=postService.getPostId(post_id);
        return ResponseEntity.ok(post);
    }

    // CRUDS FOR ORDER (TESTED AND WORKS FINE)
    @PostMapping("/newOrder/{person_id}/{post_id}")
    public ResponseEntity<String> addOrder(@RequestBody OrderDTO orderDTO, @PathVariable Long person_id,
            @PathVariable Long post_id) {
        try {
            orderService.newOrder(orderDTO, person_id, post_id);
            return ResponseEntity.ok("Order Createad");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding post: " + e.getMessage());
        }
    }

    @PutMapping("/updateOrder/{order_id}")
    public ResponseEntity<String> updateOrder(@PathVariable Long order_id, @RequestBody OrderDTO orderDTO) {
        try {
            orderService.updateOrder(order_id, orderDTO);
            return ResponseEntity.ok("Order updated");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error Updating order");
        }
    }

    @DeleteMapping("/deleteOrder/{order_id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long order_id) {
        try {
            orderService.deleteOrder(order_id);
            return ResponseEntity.ok("Order Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Can't Delete Post: " + e.getMessage());
        }
    }

    @GetMapping("/userOrder/{person_id}")
    public ResponseEntity<List<Order>> getUserOrder(@PathVariable Long person_id){
        List<Order> orders=orderService.getAllOrdersFromPersonId(person_id);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/sellerOrder/{seller_id}")
    public ResponseEntity<List<Order>> getSellerOrder(@PathVariable Long seller_id){
        List<Order> seller_order=orderService.getAllOrdersFromSellerId(seller_id);
        return ResponseEntity.ok(seller_order);
    }

    @GetMapping("/getOrderById/{order_id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long order_id){
        Order order=orderService.getOrderById(order_id);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{order_id}/accept")
    public ResponseEntity<Map<String, String>> acceptOrder(@PathVariable Long order_id) {
        try {
            orderService.acceptOrder(order_id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Order accepted successfully.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(404).body(error);
        }
    }

    @PutMapping("/{order_id}/refuse")
public ResponseEntity<Map<String, String>> refuseOrder(@PathVariable Long order_id) {
    try {
        orderService.refuseOrder(order_id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Order refused successfully.");
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        Map<String, String> error = new HashMap<>();
        error.put("error", e.getMessage());
        return ResponseEntity.status(404).body(error);
    }
}


    // CRUDS FOR REVIEW ( TESTED AND WORKS FINE )
    @PostMapping("/newReview/{person_id}/{post_id}")
    public ResponseEntity<String> addReview(@PathVariable Long person_id, @PathVariable Long post_id,
            @RequestBody ReviewDTO reviewDTO) {
        try {
            reviewService.addReview(reviewDTO, person_id, post_id);
            return ResponseEntity.ok("Review Added");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding review: " + e.getMessage());
        }
    }

    @PutMapping("/updateReview/{review_id}")
    public ResponseEntity<String> updateReview(@PathVariable Long review_id, @RequestBody ReviewDTO reviewDTO) {
        try {
            reviewService.updateReview(review_id, reviewDTO);
            return ResponseEntity.ok("Review Updated");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating review: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteReview/{review_id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long review_id) {
        try {
            reviewService.deleteReview(review_id);
            return ResponseEntity.ok("Review Deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Review cant be deleted" + e.getMessage());
        }
    }

    @GetMapping("/userReview/{person_id}")
    public ResponseEntity<List<Review>> getUserReview(@PathVariable Long person_id){
        List <Review> reviews=reviewService.getAllReviewsFromPersonId(person_id);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/review/{review_id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long review_id){
        Review review=reviewService.getReviewById(review_id);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/getPostReviews/{post_id}")
    public ResponseEntity<List<Review>> getPostReviews(@PathVariable Long post_id){
        List <Review> reviews=reviewService.getPostReviews(post_id);
        return ResponseEntity.ok(reviews);
    }

    // CRUDS FOR WISHLIST (TESTED AND WORKS FINE )
    @PostMapping("/addWishlist/{person_id}/{post_id}")
    public ResponseEntity<String> addWishlist(@PathVariable Long person_id, @PathVariable Long post_id,
            @RequestBody WishlistDTO wishlistDTO) {
        try {
            wishlistService.addWishlist(wishlistDTO, person_id, post_id);
            return ResponseEntity.ok("Added to Wishlist");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Cant be added to wishlist:" + e.getMessage());
        }
    }

    @DeleteMapping("/deleteWishlist/{wishlist_id}")
    public ResponseEntity<String> deleteWishlist(@PathVariable Long wishlist_id) {
        try {
            wishlistService.deleteWishlist(wishlist_id);
            return ResponseEntity.ok("Wishlist deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Wishlist item not deleted " + e.getMessage());
        }
    }

    @GetMapping("/userWishlist/{person_id}")
    public ResponseEntity<List<Wishlist>> userWishlist(@PathVariable Long person_id){
        List <Wishlist> wishlists=wishlistService.getAllWishlistByPersonId(person_id);
        return ResponseEntity.ok(wishlists);
    }
}
