package com.nailclinic.managementnailclinic.apiDtos;

import java.util.Set;
import com.nailclinic.managementnailclinic.Entities.Role;

public class LoginResponse {

    private String token;

    private long expiresIn;

   private Set<Role> roles;

    public String getToken() {
        return token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
