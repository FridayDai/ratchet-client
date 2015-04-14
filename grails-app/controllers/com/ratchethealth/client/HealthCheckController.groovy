package com.ratchethealth.client

class HealthCheckController {

    def index() {
        render status: 200, text: "OK"
    }
}
