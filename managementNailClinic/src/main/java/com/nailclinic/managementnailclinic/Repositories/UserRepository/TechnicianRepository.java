package com.nailclinic.managementnailclinic.Repositories.UserRepository;

import com.nailclinic.managementnailclinic.Entities.Technician;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class TechnicianRepository {

    @PersistenceContext
    private EntityManager entityManager;

    //Basic Insertion
    public Technician insertTechnician(Technician technician) {
        Query query = entityManager.createNativeQuery("INSERT INTO technician (name, description) VALUES (?, ?)", Technician.class);
        query.setParameter(1, technician.getName());
        query.setParameter(2, technician.getDescription());
        query.executeUpdate();
        return technician;

    }

    //Find By Name
    public Technician findTechnicianByName(String name) {
        Query query = entityManager.createNativeQuery("SELECT * FROM technician WHERE name = ?", Technician.class);
        query.setParameter(1, name);
        Technician technician = (Technician) query.getSingleResult();
        return technician;
    }




}