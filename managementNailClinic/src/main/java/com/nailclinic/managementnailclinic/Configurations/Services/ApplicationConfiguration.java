package com.nailclinic.managementnailclinic.Configurations.Services;

import com.nailclinic.managementnailclinic.Repositories.UserRepository.UserBasicRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;


@Configuration
public class ApplicationConfiguration {
    {/* By Default, the HTTP basic authentication, but we want to override it to perform
      - Perform the authentication by finding the user in our database.
      - Generate a JWT when the authentication succeeds

      A lot of the methods here are just configuration methods
      */}

    private final UserBasicRepository userBasicRepository;

    public ApplicationConfiguration(UserBasicRepository userBasicRepository) {
        this.userBasicRepository = userBasicRepository;
    }

    // defines how to retrieve the user using UserRepository that was injected.
    @Bean
    UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl(this.userBasicRepository);
    }

    // Create an instance of the BCryptPasswordEncoder used to encode the plain user password
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // This sets the new strategy to perform the authentication
    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}


