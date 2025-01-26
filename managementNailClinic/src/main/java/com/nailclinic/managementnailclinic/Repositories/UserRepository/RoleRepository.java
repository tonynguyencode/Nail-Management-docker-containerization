package com.nailclinic.managementnailclinic.Repositories.UserRepository;

import com.nailclinic.managementnailclinic.Entities.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findRoleByName(String roleName);
}
