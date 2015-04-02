package com.ratchethealth.client

//test for account table
public  class Account {
    String id
    String emid
    String firstName
    String lastName
    String email
    String role
    String groups
    String lastUpdate

    def Account(id, emid ,firstName, lastName, email, role, groups, lastUpdate) {
        this.id = id
        this.emid = emid
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.role = role
        this.groups = groups
        this.lastUpdate = lastUpdate
    }
}


