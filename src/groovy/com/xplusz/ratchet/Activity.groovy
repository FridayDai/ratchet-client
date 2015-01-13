package com.xplusz.ratchet

//test for activity table
class Activity {
    String id
    String description
    String level
    String organization
    String surgeryDate

    def Activity(id, description, level, organization, surgeryDate) {
        this.id = id
        this.description = description
        this.level = level
        this.organization = organization
        this.surgeryDate = surgeryDate
    }
}
