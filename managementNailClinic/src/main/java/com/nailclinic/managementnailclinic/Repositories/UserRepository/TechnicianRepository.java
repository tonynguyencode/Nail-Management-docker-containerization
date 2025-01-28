package com.nailclinic.managementnailclinic.Repositories.UserRepository;

import com.nailclinic.managementnailclinic.Entities.Technician;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class TechnicianRepository {

    @PersistenceContext
    private EntityManager entityManager;

    //Basic Insertion
    @Transactional
    public void insertTechnician(Technician technician) {
        Query query = entityManager.createNativeQuery("INSERT INTO technician (id, name, description) VALUES (?, ?, ?)", Technician.class);
        query.setParameter(1, technician.getId());
        query.setParameter(2, technician.getName());
        query.setParameter(3, technician.getDescription());
        query.executeUpdate();
    }

    //Find By Name
    public Technician findTechnicianByName(String name) {
        Query query = entityManager.createNativeQuery("SELECT * FROM technician WHERE name = ?", Technician.class);
        query.setParameter(1, name);
        Technician technician = (Technician) query.getSingleResult();
        return technician;
    }

    public Boolean existTechnicianName(String name) {
        Query query = entityManager.createNativeQuery("SELECT * FROM technician WHERE name = ?", Technician.class);
        query.setParameter(1, name);
        List<Technician> result = query.getResultList();
        if(result.isEmpty()){
            return false;
        } else {
            return true;
        }
    }


}