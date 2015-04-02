package com.ratchethealth.client

//test for team table
public class Team {
    String id
    String emid
    String name
    String email
    String role
    String description

    def Team(id, emid, name, email, role, description) {
        this.id = id
        this.emid = emid
        this.name = name
        this.email = email
        this.role = role
        this.description = description
    }
}
