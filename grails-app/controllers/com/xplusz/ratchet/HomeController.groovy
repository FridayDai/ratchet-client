package com.xplusz.ratchet

class HomeController extends AbstractController {

    def beforeInterceptor = [action: this.&auth]
    def index() {
        render view: '/pages/home'
    }

    def logout() {
        render view: '/pages/home'
    }
}
