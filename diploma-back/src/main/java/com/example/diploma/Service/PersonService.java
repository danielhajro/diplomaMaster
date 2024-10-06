package com.example.diploma.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.diploma.DTO.PersonDTO;
import com.example.diploma.Model.Person;

@Service
public interface PersonService {

    //Admin Functions
    List<Person> getAllUsers();
    List<Person> searchPersonByName(String name);
    List<Person> searchPersonByEmail(String email);
    List<Person> searchPersonById(Long person_id);

    //Get Person Info
    Person getPersonInfo(Long person_id);
    String getRole(Long person_id);

    //Crud Operations
    Person addUser(PersonDTO personDTO);
    Person updatePerson(Long person_id,PersonDTO personDTO);
    void deletePerson(Long person_id);

}
