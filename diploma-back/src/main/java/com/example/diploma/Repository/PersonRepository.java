package com.example.diploma.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.diploma.Model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query(value="Select * from person p where lower(name)=lower(:name)",nativeQuery = true)
    List<Person> findPersonByName(@Param("name") String name);

    @Query(value = "SELECT * FROM person p WHERE LOWER(email) = LOWER(:email)", nativeQuery = true)
    List<Person> findPersonByEmail(@Param("email") String email);

    @Query(value="Select * from person p where person_id=:person_id",nativeQuery = true)
    List <Person> findPersonById(@Param("person_id")Long person_id);

    @Query(value = "SELECT * FROM person p WHERE LOWER(email) = LOWER(:email)", nativeQuery = true)
    Optional<Person> personLoginEmail(@Param("email") String email);

    @Query(value = "SELECT MAX(p.seller_id) FROM Person p",nativeQuery = true)
    Long findMaxSellerId();

    @Query(value = "SELECT p.seller_id FROM PERSON p WHERE person_id=(:person_id)", nativeQuery = true)
    Long getSellerId(@Param("person_id") Long person_id);

    @Query(value= "Select p.person_id from person p where seller_id=(:seller_id)", nativeQuery = true)
    Long getPersonIdFromSellerId(@Param("seller_id") Long seller_id);

    @Query(value= "Select p.* from person p where seller_id=(:seller_id)", nativeQuery = true)
    Person getPersonFromSellerId(@Param("seller_id") Long seller_id);

    @Query(value = "Select p.role from Person p where person_id=(:person_id)", nativeQuery = true)
    String findRole(@Param("person_id") Long person_id);

    @Query(value= "select p.* from person p where person_id=(:person_id)", nativeQuery= true)
    Person getPersonById(@Param("person_id") Long person_id);
}
