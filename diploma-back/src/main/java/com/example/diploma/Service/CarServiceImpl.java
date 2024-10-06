package com.example.diploma.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.diploma.DTO.CarsDTO;
import com.example.diploma.Model.Cars;
import com.example.diploma.Model.Person;
import com.example.diploma.Repository.CarsRepository;
import com.example.diploma.Repository.PersonRepository;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarsRepository carsRepository;
    private PersonRepository personRepository;

    @Autowired
    public CarServiceImpl(CarsRepository carsRepository, PersonRepository personRepository){
        this.carsRepository=carsRepository;
        this.personRepository=personRepository;
    }

    @Override
    public List<Cars> getAllCars() {
        return carsRepository.findAll();
    }

    @Override
    public List<Cars> getCarByMake(String make) {
        return carsRepository.findByMake(make);
    }

    @Override
    public List<Cars> getCarByModel(String model) {
        return carsRepository.findByModel(model);
    }

    @Override
    public List<Cars> getCarByYear(int year) {
        return carsRepository.findByYear(year);
    }

    @Override
    public List<Cars> getCarByMileage(int mileage) {
        return carsRepository.findByMileage(mileage);
    }

    @Override
    public List<Cars> getCarByFuel(String fuel) {
        return carsRepository.findByFuel(fuel);
    }

    @Override
    public List<Cars> getCarByGear(String gear) {
        return carsRepository.findByGear(gear);
    }

    @Override
    public List<Cars> getCarByPrice(int price) {
        return carsRepository.findByPrice(price);
    }

    @Override
    public List<Cars> getUserCarById(Long person_id) {
        return carsRepository.findUserCarById(person_id);
    }

    @Override
    public Cars getCarById(Long car_id) {
       return carsRepository.findCarById(car_id);
    }
   
    @Override
    public Cars createCars(CarsDTO carsDTO) {
        Cars car=new Cars();
        car.setFuel(carsDTO.getFuel());
        car.setGear(carsDTO.getGear());
        car.setHp(carsDTO.getHp());
        car.setMake(carsDTO.getMake());
        car.setMileage(carsDTO.getMileage());
        car.setModel(carsDTO.getModel());
        car.setOffer_type(carsDTO.getOffer_type());
        car.setPrice(carsDTO.getPrice());
        car.setYear(carsDTO.getYear());
        Person person= personRepository.findById(carsDTO.getPerson_id()).orElseThrow(() -> new IllegalArgumentException("User not found with Id: "+ carsDTO.getPerson_id()));
        car.setPerson_id(person);

        return carsRepository.save(car);
    }

    @Override
    public void updateCars(Long car_id, CarsDTO carsDTO) {
        Optional<Cars> optionalCars=carsRepository.findById(car_id);
        if(optionalCars.isPresent()){
            Cars existingCars=optionalCars.get();
            existingCars.setFuel(carsDTO.getFuel());
            existingCars.setGear(carsDTO.getGear());
            existingCars.setHp(carsDTO.getHp());
            existingCars.setMake(carsDTO.getMake());
            existingCars.setMileage(carsDTO.getMileage());
            existingCars.setModel(carsDTO.getModel());
            existingCars.setOffer_type(carsDTO.getOffer_type());
            existingCars.setPrice(carsDTO.getPrice());
            existingCars.setYear(carsDTO.getYear());
            carsRepository.save(existingCars);
        }else{
            throw new RuntimeException("Car not found with id " + car_id);
        }
    }
    

    @Override
    public void deleteCar(Long id) {
        if(carsRepository.existsById(id)){
            carsRepository.deleteById(id);
        }else{
            throw new RuntimeException("Car not found with id: " + id );
        }
    }

}
