package com.nailclinic.managementnailclinic.EntityController;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import com.nailclinic.managementnailclinic.EntityServices.AppointmentService;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.TechnicianRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Date;
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

    @GetMapping(path = "/getBookedAppointments")
    public ResponseEntity<List<LocalDateTime>> getAppointmentWithTech(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
                                                                      @RequestParam String name) {
        List<LocalDateTime> available_appointments = appointmentService.getAllAppointmentsTechnician(date, name);
        return new ResponseEntity<>(available_appointments, HttpStatus.OK);
    }
}
