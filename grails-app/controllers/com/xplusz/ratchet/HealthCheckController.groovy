package com.xplusz.ratchet

class HealthCheckController {

    def index() {
        render status: 200, text: "OK"
    }
}
