package com.ratchethealth.client

//test for giver table
public class Giver {
    String id
    String emid
    String name
    String email
    String relationship
    String status

    def Giver(id, emid, name, email, relationship, status) {
        this.id = id
        this.emid = emid
        this.name = name
        this.email = email
        this.relationship = relationship
        this.status = status
    }
}
