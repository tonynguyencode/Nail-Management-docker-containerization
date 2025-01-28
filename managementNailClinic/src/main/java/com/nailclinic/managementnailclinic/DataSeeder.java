package com.nailclinic.managementnailclinic;

import com.nailclinic.managementnailclinic.Entities.Role;
import com.nailclinic.managementnailclinic.Entities.Technician;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.RoleRepository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.TechnicianRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final TechnicianRepository technicianRepository;

    public DataSeeder(RoleRepository roleRepository, TechnicianRepository technicianRepository) {
        this.roleRepository = roleRepository;
        this.technicianRepository = technicianRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Seed two roles: USER and ADMIN
        if(!roleRepository.existsById(1)){
            Role role = new Role();
            role.setName("USER");
            roleRepository.save(role);
        }
        if(!roleRepository.existsById(2)){
            Role role = new Role();
            role.setName("ADMIN");
            roleRepository.save(role);
        }


        // Seed 3 technicians
        if(!technicianRepository.existTechnicianName("Flower")){
            Technician technician = new Technician();
            technician.setName("Flower");
            technician.setId(1);
            technician.setDescription("None");
            technicianRepository.insertTechnician(technician);
        }
        if(!technicianRepository.existTechnicianName("Linda")){
            Technician technician = new Technician();
            technician.setName("Linda");
            technician.setId(2);
            technician.setDescription("None");
            technicianRepository.insertTechnician(technician);
        }
        if(!technicianRepository.existTechnicianName("John")){
            Technician technician = new Technician();
            technician.setName("John");
            technician.setId(3);
            technician.setDescription("None");
            technicianRepository.insertTechnician(technician);
        }

    }

}
