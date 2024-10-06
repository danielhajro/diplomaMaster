package com.example.diploma.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.diploma.DTO.CarsDTO;
import com.example.diploma.Model.Cars;

@Service
public interface CarService {

    //Search functions for Admin and User
    List<Cars> getAllCars();   
    List<Cars> getCarByMake(String make);
    List<Cars> getCarByModel(String model);
    List<Cars> getCarByYear(int year);
    List<Cars> getCarByMileage(int mileage);
    List<Cars> getCarByFuel(String fuel);
    List<Cars> getCarByGear(String gear);
    List<Cars> getCarByPrice(int price);

    //List Car of User
    List<Cars> getUserCarById(Long person_id);
    Cars getCarById(Long car_id);

    //Cruds
    Cars createCars(CarsDTO carsDTO);
    void updateCars(Long car_id, CarsDTO carsDTO);
    void deleteCar(Long car_id);

}
