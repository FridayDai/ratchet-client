package com.xplusz.ratchet

class TreatmentController extends BaseController {

    //    def beforeInterceptor = [action: this.&auth]
    def index() {
        render view: '/treatment/treatment'
    }

}
