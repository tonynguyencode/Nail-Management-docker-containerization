package com.nailclinic.managementnailclinic.EntityServices;

import com.nailclinic.managementnailclinic.Entities.Role;
import com.nailclinic.managementnailclinic.Entities.User;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.RoleRepository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.UserBasicRepository;
import com.nailclinic.managementnailclinic.apiDtos.LoginUserDto;
import com.nailclinic.managementnailclinic.apiDtos.RegisterUserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {
    private final UserBasicRepository userBasicRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final RoleRepository roleRepository;

    public AuthenticationService(UserBasicRepository userBasicRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, RoleRepository roleRepository) {
        this.userBasicRepository = userBasicRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setUsername(input.getUsername());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setFullName(input.getFullName());
        user.setPhoneNumber(input.getPhoneNumber());
        Set<String> roles_name = new HashSet<>();
        roles_name.add("USER");
        Set<Role> roles = roles_name.stream()
                .map(roleRepository::findRoleByName)
                .collect(Collectors.toSet());
        user.setRoles(roles);
        return userBasicRepository.save(user);
    }

    // Authentication Method
    public User authenticate(LoginUserDto loginUserDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDto.getUsername(), loginUserDto.getPassword()));

        return userBasicRepository.findByEmail(loginUserDto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
