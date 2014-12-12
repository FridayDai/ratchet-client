package com.xplusz.ratchet

class LoginController {

    def login() {
        render view: '/pages/login'
    }

    def logout() {
        render view: '/pages/authDummy'
    }
}
