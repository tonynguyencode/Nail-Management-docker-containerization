package com.nailclinic.managementnailclinic.Repositories.UserRepository.Appointment;

import com.nailclinic.managementnailclinic.Entities.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentBasicRepository extends CrudRepository<Appointment, Integer> {



}
