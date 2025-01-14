package com.nailclinic.managementnailclinic.EntityServices;

import com.nailclinic.managementnailclinic.Repositories.UserRepository.UserBasicRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserBasicRepository userRepository;

    public UserService(UserBasicRepository userRepository) {
        this.userRepository = userRepository;
    }


}
