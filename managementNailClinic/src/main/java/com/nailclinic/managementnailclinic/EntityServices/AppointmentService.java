package com.nailclinic.managementnailclinic.EntityServices;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment.AppointmentBasicRepository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import org.springframework.messaging.simp.SimpMessagingTemplate;


@Service
public class AppointmentService {

    private final AppointmentBasicRepository appointmentBasicRepository;
    private final AppointmentRepository appointmentRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;


    public AppointmentService(AppointmentBasicRepository appointmentBasicRepository, AppointmentRepository appointmentRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.appointmentBasicRepository = appointmentBasicRepository;
        this.appointmentRepository = appointmentRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public Appointment saveAppointment(Appointment appointment) {
        Appointment success = appointmentBasicRepository.save(appointment);
        notifyAppointmentUpdates(success);
        return success;
    }

    public List<Appointment> getAllAppointmentsTech(String name) {
        return appointmentRepository.findAppointmentByTechnician(name);
    }

    // Methods to communicate with the frontend via WebSockets: if there is an appointment
    // is created, updates, or deleted, update the clients
    public void notifyAppointmentUpdates(Appointment appointment) {
        simpMessagingTemplate.convertAndSend("/topic/appointments", appointment);
    }

    public List<LocalDateTime> getAllAppointmentsTechnician(Date date, String name) {
        return appointmentRepository.findAvailableAppointSlot(date, name);
    }

}
