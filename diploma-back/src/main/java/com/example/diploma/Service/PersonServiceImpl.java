package com.example.diploma.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.diploma.DTO.PersonDTO;
import com.example.diploma.Model.Person;
import com.example.diploma.Repository.PersonRepository;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    public PersonServiceImpl(PersonRepository personRepository){
        this.personRepository=personRepository;
    }

    @Override
    public List<Person> getAllUsers() {
        return personRepository.findAll();
    }

    public Person getPersonInfo(Long person_id) {
        return personRepository.findById(person_id)
            .orElseThrow(() -> new RuntimeException("Person not found with id: " + person_id));
    }

    @Override
    public List<Person> searchPersonByName(String name) {
        return personRepository.findPersonByName(name);
    }

    @Override
    public List<Person> searchPersonByEmail(String email) {
        return personRepository.findPersonByEmail(email);
    }

    @Override
    public List<Person> searchPersonById(Long person_id) {
        return personRepository.findPersonById(person_id);
    }

    @Override
    public String getRole(Long person_id){
        return personRepository.findRole(person_id);
    }

    @Override
    public Person addUser(PersonDTO personDTO) {
        Person person = new Person();
        person.setAddress(personDTO.getAddress());
        person.setDob(personDTO.getDob());
        person.setEmail(personDTO.getEmail());
        person.setName(personDTO.getName());
        person.setNumber(personDTO.getNumber());
        person.setPassword(personDTO.getPassword());
        person.setProfilePic(personDTO.getProfilePic());
        person.setRole(personDTO.getRole());
        person.setState(personDTO.getState());
        person.setSurname(personDTO.getSurname());
        Long maxSellerId= personRepository.findMaxSellerId();
        person.setSeller_id(maxSellerId== null ? 1 : maxSellerId + 1);
        return personRepository.save(person);
    }

    @Override
    public Person updatePerson(Long person_id, PersonDTO personDTO) {
        Person person = personRepository.findById(person_id).orElseThrow(()-> new RuntimeException("User not Found"));
        person.setAddress(personDTO.getAddress());
        person.setDob(personDTO.getDob());
        person.setEmail(personDTO.getEmail());
        person.setName(personDTO.getName());
        person.setNumber(personDTO.getNumber());
        person.setPassword(personDTO.getPassword());
        person.setProfilePic(personDTO.getProfilePic());
        person.setState(personDTO.getState());
        person.setSurname(personDTO.getSurname());

        return personRepository.save(person);
    }

    @Override
    public void deletePerson(Long person_id) {
        if(personRepository.existsById(person_id)){
            personRepository.deleteById(person_id);
        }else{
            throw new RuntimeException("User not found with ID: " +person_id);
        }
    }

}
