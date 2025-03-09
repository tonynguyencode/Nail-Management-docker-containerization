package com.nailclinic.managementnailclinic;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.nailclinic.managementnailclinic.Entities.Role;
import com.nailclinic.managementnailclinic.Entities.User;
import com.nailclinic.managementnailclinic.EntityServices.AuthenticationService;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.RoleRepository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.UserBasicRepository;
import com.nailclinic.managementnailclinic.apiDtos.RegisterUserDto;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.Optional;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class AuthenticationServiceTest {

    // Import a Mock Repository (mock or stub the Repository layer to isolate and test the logic in the Service alone)




}
