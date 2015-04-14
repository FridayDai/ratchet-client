package com.ratchethealth.client

class Task {
    String id
    String title
    String type
    String status

    def Task(id, title, type, status) {
        this.id = id
        this.title = title
        this.type = type
        this.status = status
    }

    public Task() {

    }
}
