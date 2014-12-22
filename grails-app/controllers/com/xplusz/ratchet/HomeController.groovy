package com.xplusz.ratchet

class HomeController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def index() {
        render view: '/providers/providers'
    }
}
