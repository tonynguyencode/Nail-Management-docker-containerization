package com.nailclinic.managementnailclinic.Repositories.UserRepository;


import com.nailclinic.managementnailclinic.Entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserBasicRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
