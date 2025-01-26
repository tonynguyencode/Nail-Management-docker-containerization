package com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment;


import com.nailclinic.managementnailclinic.Entities.Appointment;

import com.nailclinic.managementnailclinic.Entities.Technician;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.stereotype.Repository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.TechnicianRepository;

import java.util.List;

@Repository
public class AppointmentRepository {


    @PersistenceContext
    private EntityManager entityManager;

    private final TechnicianRepository technicianRepository;

    public AppointmentRepository(TechnicianRepository technicianRepository){
        this.technicianRepository = technicianRepository;
    }


    //Custom Queries : /schedule (Appointment)
    public Appointment save(Appointment appointment) {
        //AppointmentDto Custom
        entityManager.persist(appointment);
        return appointment;
    }

    public List<Appointment> findAppointmentByTechnician(String name) {
        Technician technician = technicianRepository.findTechnicianByName(name);

        Query query = entityManager.createNativeQuery("select * from appointment where technician_id = ?", Appointment.class);
        query.setParameter(1, technician.getId());
        return query.getResultList();
    }

}
