# THIS IS A PROFESSIONAL MASTER DIPLOMA THESIS PRESENTED AT Universiteti Politeknik i Tiranes, Tirana , Albania

# Car Marketplace Web Application

This project is a fully functional car marketplace web application built using **Jupyter Notebook** for data cleaning, **MySQL WorkBench** for database management, **Spring Boot Java** for backend development, and **Angular** for the frontend. The application allows users to register cars, post listings, make orders, leave reviews, and manage wishlists. The admin has access to manage users, posts, orders, and cars via a dashboard.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Database Schema](#database-schema)
5. [Future Improvements](#future-improvements)

## Features

### User Features
- **Car Registration:** Users can register their vehicles with details like make, model, year, mileage, fuel type, and price.
- **Post Listings:** Create, edit, and delete posts for selling cars.
- **Order Management:** Place orders for cars, manage payment methods (cash, card, or PayPal), and track order statuses (pending, accepted, refused).
- **Reviews:** Leave comments and ratings (1-5 stars) for posted cars.
- **Wishlist:** Save favorite car posts to a wishlist for easy access later.
  
### Admin Features
- **Admin Dashboard:** Manage users, posts, cars, orders, and reviews.
- **Admin Login:** Access to the dashboard is restricted and can only be accessed through a direct URL.

## Technologies

- **Jupyter Notebook**: Used for cleaning and preparing the car dataset.
- **MySQL**: Relational database used to store user, car, post, order, and review data.
- **Spring Boot (Java)**: Backend framework used to develop RESTful APIs and handle business logic.
  - **Model, Repository, Service, REST Controller** architecture
  - Entities: `Person`, `Cars`, `Post`, `Order`, `Review`, `Wishlist`
- **Angular**: Frontend framework used to create interactive user interfaces.
  - Components for user management, post creation, order placement, reviews, and wishlists.
  - Admin dashboard with management capabilities.
  - **NGX-Charts** for displaying car data through charts.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/danielhajro/diplomaMaster
   cd car-marketplace

2. **Backend setup**:

Ensure MySQL is installed and create the necessary schema.
Update application.properties with your MySQL credentials.
Run the Spring Boot application:
````java
mvn spring-boot:run 
````

3. **Front-end setup**:
    Navigate to the diploma-front directory
    ````bash
    cd diploma-front;
    ````
    ````bash
    npm install; 
    //In case it's not already installed;
    ````
    ````bash
    ng serve;
    ````

 ## Database Schema
The database consists of several tables:

Person: Stores user information (name, email, etc.).
Cars: Stores car details (make, model, year, price, etc.).
Post: Contains listings created by users for selling cars.
Order: Stores order details, including payment method and status.
Review: Tracks reviews and ratings left by users for each post.
Wishlist: Stores favorite posts added by users.

 ## Future Improvements
Performance Optimization: Implement caching and optimize query performance.
Additional Features:
Real-time notifications for order status updates.
Chat functionality between buyers and sellers.
Enhanced filtering and search capabilities for posts and cars.
