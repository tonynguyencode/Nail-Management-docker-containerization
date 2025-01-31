package com.nailclinic.managementnailclinic.EntityController;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import com.nailclinic.managementnailclinic.EntityServices.AppointmentService;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.TechnicianRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(path = "/api/admin")
@RestController
public class AdminController {

    private final AppointmentService appointmentService;
    private final TechnicianRepository technicianRepository;

    public AdminController(AppointmentService appointmentService, TechnicianRepository technicianRepository) {
        this.appointmentService = appointmentService;
        this.technicianRepository = technicianRepository;
    }

    @GetMapping(path = "/getTechAppointments")
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestParam String technician_name) {
        return new ResponseEntity<>(appointmentService.getAllAppointmentsTech(technician_name), HttpStatus.OK);
    }

}
