package com.example.diploma.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.diploma.Model.Cars;

import jakarta.transaction.Transactional;
@Repository
public interface CarsRepository extends JpaRepository<Cars,Long>{

    @Query(value = "SELECT * FROM Cars WHERE LOWER(make) = LOWER(:make)", nativeQuery = true)
    List<Cars> findByMake(@Param("make") String make);

    @Query(value = "SELECT * FROM Cars WHERE LOWER(model) = LOWER(:model)", nativeQuery = true)
    List<Cars> findByModel(@Param("model") String model);

    @Query(value = "SELECT * FROM Cars WHERE year = (:year)", nativeQuery = true)
    List<Cars> findByYear(@Param("year") int year);

    @Query(value = "SELECT * FROM Cars WHERE mileage = (:mileage)", nativeQuery = true)
    List<Cars> findByMileage(@Param("mileage") int mileage);

    @Query(value = "SELECT * FROM Cars WHERE LOWER(fuel) = LOWER(:fuel)", nativeQuery = true)
    List<Cars> findByFuel(@Param("fuel") String fuel);

    @Query(value = "SELECT * FROM Cars WHERE LOWER(gear) = LOWER(:gear)", nativeQuery = true)
    List<Cars> findByGear(@Param("gear") String gear);

    @Query(value = "SELECT * FROM Cars WHERE price <= (:price)", nativeQuery = true)
    List<Cars> findByPrice(@Param("price") int price);

    @Query(value="Select * from cars where person_id =(:person_id)", nativeQuery = true)
    List<Cars> findUserCarById(@Param("person_id") Long person_id);

    @Query(value= "Select * from cars where car_id=(:car_id)", nativeQuery = true)
    Cars findCarById(@Param("car_id") Long car_id);

    @Modifying
    @Transactional
    @Query("UPDATE Cars c SET c.price = :new_price WHERE c.car_id = :car_id")
    void updatePriceById(@Param("car_id") Long carId, @Param("new_price") String price);
}
