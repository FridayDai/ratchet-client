package com.xplusz.ratchet

//test for team table
public class Team {
    String id
    String emid
    String image
    String firstName
    String lastName
    String email
    String phoneNumber
    String role

    def Team(id, emid, image, firstName, lastName, email, phoneNumber, role) {
        this.id = id
        this.emid = emid
        this.image = image
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.role = role
    }
}
