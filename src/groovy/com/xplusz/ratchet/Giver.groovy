package com.xplusz.ratchet

//test for giver table
public class Giver {
    String id
    String emid
    String image
    String firstName
    String lastName
    String email
    String phoneNumber
    String relationship
    String status

    def Giver(id, emid, image, firstName, lastName, email, phoneNumber, relationship,status) {
        this.id = id
        this.emid = emid
        this.image = image
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.relationship = relationship
        this.status = status
    }
}
