package com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment;


import com.nailclinic.managementnailclinic.Entities.Appointment;

import com.nailclinic.managementnailclinic.Entities.Technician;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.stereotype.Repository;
import com.nailclinic.managementnailclinic.Repositories.UserRepository.TechnicianRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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

    public List<LocalDateTime> findAvailableAppointSlot(Date date, String technicianName){
        Technician technician = technicianRepository.findTechnicianByName(technicianName);
        Query query = entityManager.createNativeQuery("select appointment_date_time from appointment where technician_id = ? and DATE(appointment_date_time) = ?");
        query.setParameter(1, technician.getId());
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        query.setParameter(2, sqlDate);
        List<Timestamp> localDateTimeList = query.getResultList();
        //Conversion to Local Date Time from java.sql.Timestamp
        List<LocalDateTime> result = new ArrayList<>();
        for (Timestamp object : localDateTimeList) {
            LocalDateTime localDateTime = object.toLocalDateTime();
            result.add(localDateTime);
        }

        return result;
    }

}
