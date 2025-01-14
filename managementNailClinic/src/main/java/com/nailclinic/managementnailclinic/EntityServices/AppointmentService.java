package com.nailclinic.managementnailclinic.EntityServices;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment.AppointmentBasicRepository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment.AppointmentRepository;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentBasicRepository appointmentBasicRepository;
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentBasicRepository appointmentBasicRepository, AppointmentRepository appointmentRepository) {
        this.appointmentBasicRepository = appointmentBasicRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentBasicRepository.save(appointment);
    }



}
