package com.ratchethealth.client

import grails.validation.Validateable

@Validateable

class LoginCommand {
    String email
    String password
    static constraints = {
        email  (blank: false, email: true)
        password(blank: false)
    }
}
