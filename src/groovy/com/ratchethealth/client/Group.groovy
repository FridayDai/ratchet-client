package com.ratchethealth.client

//test for group

class Group {
    String emid
    String id
    String Name
    String lastUpdate

    def Group(emid, name, lastUpdate, id) {
        this.emid = emid
        this.id = id
        this.name = name
        this.lastUpdate = lastUpdate
    }
}
