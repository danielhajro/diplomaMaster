package com.example.diploma.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.example.diploma.Repository.CarsRepository;
import com.example.diploma.Service.CarService;
import com.example.diploma.Service.OrderService;
import com.example.diploma.Service.PersonService;
import com.example.diploma.Service.PostService;
import com.example.diploma.Service.ReviewService;
import com.example.diploma.Service.WishlistService;

@RestController
@RequestMapping("/admin")
public class AdminController {

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
    private CarsRepository carRepository; 

    @Autowired
    public AdminController(PersonService personService, PostService postService, ReviewService reviewService,
            WishlistService wishlistService, OrderService orderService, CarService carService) {
        this.personService = personService;
        this.postService = postService;
        this.wishlistService = wishlistService;
        this.orderService = orderService;
        this.carService = carService;
        this.reviewService = reviewService;
    }


    //Cruds for Person IN ADMIN 
    @PostMapping("/addPerson")
    public ResponseEntity<String> addUser(@Valid @RequestBody PersonDTO personDTO) {
        personService.addUser(personDTO);
        return ResponseEntity.ok("Person added successfully");
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

    @GetMapping("/getRole/{person_id}")
    public ResponseEntity<String> getRole(@PathVariable Long person_id){
        String role= personService.getRole(person_id);
        return ResponseEntity.ok(role);
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<Person>> getAllUsers(){
        List <Person> persons= personService.getAllUsers();
        return ResponseEntity.ok(persons);
    }

    @GetMapping("/allUsers/name:{name}")
    public ResponseEntity<List<Person>> getUserByName(@PathVariable String name){
        List <Person> p_name=personService.searchPersonByName(name);
        return ResponseEntity.ok(p_name);
    }

    @GetMapping("/allUsers/email:{email}")
    public ResponseEntity<List<Person>> getUserByEmail(@PathVariable String email) {
        List<Person> p_email = personService.searchPersonByEmail(email);
        return ResponseEntity.ok(p_email);
    }

    @GetMapping("/allUsers/{person_id}")
    public ResponseEntity<List<Person>> getUserById(@PathVariable Long person_id){
        List <Person> p_id=personService.searchPersonById(person_id);
        return ResponseEntity.ok(p_id);
    }

    //CARS CRUDS AND OTHER ADMIN FUNCTIONS

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

    @GetMapping("/cars")
    public ResponseEntity<List<Cars>> getAllCars(){
        List <Cars> cars= carService.getAllCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/cars/make:{make}")
    public ResponseEntity<List<Cars>> getCarMake(@PathVariable String make){
        List <Cars> c_make=carService.getCarByMake(make);
        return ResponseEntity.ok(c_make);
    }
    
    @GetMapping("/cars/model:{model}")
    public ResponseEntity<List<Cars>> getCarModel(@PathVariable String model){
        List <Cars> c_model=carService.getCarByModel(model);
        return ResponseEntity.ok(c_model);
    }

    @GetMapping("/cars/year:{year}")
    public ResponseEntity<List<Cars>> getCarYear(@PathVariable int year){
        List <Cars> c_year=carService.getCarByYear(year);
        return ResponseEntity.ok(c_year);
    }

    @GetMapping("/cars/mileage:{mileage}")
    public ResponseEntity<List<Cars>> getCarMileage(@PathVariable int mileage){
        List <Cars> c_mileage=carService.getCarByMileage(mileage);
        return ResponseEntity.ok(c_mileage);
    }

    @GetMapping("/cars/fuel:{fuel}")
    public ResponseEntity<List<Cars>> getCarFuel(@PathVariable String fuel){
        List <Cars> c_fuel=carService.getCarByFuel(fuel);
        return ResponseEntity.ok(c_fuel);
    }

    @GetMapping("/cars/gear:{gear}")
    public ResponseEntity<List<Cars>> getCarGear(@PathVariable String gear){
        List <Cars> c_gear=carService.getCarByGear(gear);
        return ResponseEntity.ok(c_gear);
    }

    @GetMapping("/cars/price:{price}")
    public ResponseEntity<List<Cars>> getCarPrice(@PathVariable int price){
        List <Cars> c_price=carService.getCarByPrice(price);
        return ResponseEntity.ok(c_price);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/cars/get_{car_id}")
    public ResponseEntity<Cars> getCarId(@PathVariable Long car_id){
        Cars car=carRepository.findCarById(car_id);
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
     public ResponseEntity<String> putMethodName(@PathVariable Long post_id, @RequestBody PostDTO postDTO) {
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

     @GetMapping("/allPost")
     public ResponseEntity<List<Post>> getAllPost(){
        List <Post> posts= postService.getAllPosts();
        return ResponseEntity.ok(posts);
     }

     @GetMapping("/allPost/title:{title}")
     public ResponseEntity<List<Post>> getPostByTitle(@PathVariable String  title){
        List <Post> p_title=postService.seachPostByTitle(title);
        return ResponseEntity.ok(p_title);
     }

     @GetMapping("/allPost/seller:{seller_id}")
     public ResponseEntity<List<Post>> getPostBySellerId(@PathVariable Long  seller_id){
        List <Post> p_sId=postService.findPostBySellerId(seller_id);
        return ResponseEntity.ok(p_sId);
     }

     //CRUDS FOR ORDER OPERATIONS
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

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders=orderService.getAllOrders();
        return ResponseEntity.ok(orders);
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

    @GetMapping("/allReviews")
    public ResponseEntity<List<Review>> getAllReview(){
        List <Review> review=reviewService.getAllReviews();
        return ResponseEntity.ok(review);
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