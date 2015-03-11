package com.xplusz.ratchet

class HealthCheckController {

    def healthCheckService

    def index() {
        def resp = healthCheckService.checkHealth()
        if (resp.status == 200) {
            render status: 200, text: "OK"
        } else {
            render status: 400
        }
    }
}
