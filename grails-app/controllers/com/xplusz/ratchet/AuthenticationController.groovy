package com.xplusz.ratchet

import grails.converters.JSON

class AuthenticationController extends AbstractController {

    static allowedMethods = [login: ['POST', 'GET'], logout: ['GET']]

    def beforeInterceptor = [action: this.&auth, except: ['login']]

    def authenticationService

    /**
     * Default action; redirects to home page if logged in, /login otherwise.
     */
    def index() {
        redirect(uri: '/home')
    }
    /**
     * Handle login.
     */
    def login() {
        if (request.method == "GET") {
            render(view: '/pages/login')
        } else if (request.method == "POST") {
            authenticate()
        }
    }

    /**
     * Handle logout.
     * @return
     */
    def logout() {

        if (!authenticationService.logout(request, response)) {
            log.warn("logout failed")
        }
        redirect(uri: "/login")
    }

    private def authenticate() {
        def resp = authenticationService.authenticate(request, response, params)
        if (resp) {
            if (resp?.authenticated) {
                redirect(uri: '/')
            } else {
                render(view: '/pages/login', model: [errorMsg: resp.errorMessage])
            }
        }else{
            def errorMessage = message(code:"security.errors.login.missParams")
            render(view: '/pages/login', model: [errorMsg: errorMessage])
        }
    }

}
