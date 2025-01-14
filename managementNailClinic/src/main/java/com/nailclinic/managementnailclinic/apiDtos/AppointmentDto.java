package com.nailclinic.managementnailclinic.apiDtos;


import com.nailclinic.managementnailclinic.Entities.Appointment;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public class AppointmentDto {

    private LocalDateTime appointmentTime;



    @Enumerated(EnumType.STRING)
    private Appointment.Status status;

    private String Note;
    private String technician_name;
    {/*
     1. Flower
     2. Linda
     3. John
     This note is for Technician
     */}

    public Appointment.Status getStatus() {
        return this.status;
    }

    public void setStatus(Appointment.Status status) {
        this.status = status;
    }



    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }



    public String getNote() {
        return Note;
    }

    public void setNote(String note) {
        Note = note;
    }


    public String getTechnician_name() {
        return technician_name;
    }

    public void setTechnician_name(String technician_name) {
        this.technician_name = technician_name;
    }
}
