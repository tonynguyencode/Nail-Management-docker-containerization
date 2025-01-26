package com.nailclinic.managementnailclinic.EntityController;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import com.nailclinic.managementnailclinic.Entities.Technician;
import com.nailclinic.managementnailclinic.Entities.User;
import com.nailclinic.managementnailclinic.EntityServices.AppointmentService;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.TechnicianRepository;
import com.nailclinic.managementnailclinic.apiDtos.AppointmentDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "/api/appointment")
@RestController
public class AppointmentController {

    {/* Injection */}
    private final AppointmentService appointmentService;
    private final TechnicianRepository technicianRepository;

    public AppointmentController(AppointmentService appointmentService, TechnicianRepository technicianRepository) {
        this.appointmentService = appointmentService;
        this.technicianRepository = technicianRepository;
    }

    @PostMapping(path = "/schedule")
    public ResponseEntity<Appointment> saveAppointment(@RequestBody AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment();

        //Get Customer Id and set User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal(); //We have the User Object now.
        appointment.setUser(user);

        //Set the information from the AppointmentDto (setDateTime, setStatus, setNote)
        appointment.setAppointmentDateTime(appointmentDto.getAppointmentTime());
        appointment.setStatus(appointmentDto.getStatus());
        appointment.setNote(appointmentDto.getNote());

        //Set the technician, the Technician should be always valid.
        Optional<Technician> technician = Optional.ofNullable(technicianRepository.findTechnicianByName(appointmentDto.getTechnician_name()));
        appointment.setTechnician(technician.get());
        return new ResponseEntity<>(appointmentService.saveAppointment(appointment), HttpStatus.OK);
    }





}

