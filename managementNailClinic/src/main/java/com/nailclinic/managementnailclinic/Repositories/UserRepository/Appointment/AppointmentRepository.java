package com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import com.nailclinic.managementnailclinic.apiDtos.AppointmentDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class AppointmentRepository {


    @PersistenceContext
    private EntityManager entityManager;


    //Custom Queries : /schedule (Appointment)
    public Appointment save(Appointment appointment) {
        //AppointmentDto Custom
        entityManager.persist(appointment);
        return appointment;
    }


}
