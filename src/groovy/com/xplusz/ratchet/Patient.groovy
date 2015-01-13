package com.xplusz.ratchet

class Patient {
    String id
    String emid
    String firstName
    String lastName
    String email
    String phoneNumber
    String treatments

    def Patient(id, emid, firstName, lastName, email, phoneNumber, treatments) {
        this.id = id
        this.emid = emid
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.treatments = treatments
    }

}
