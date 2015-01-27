package com.xplusz.ratchet

import grails.converters.JSON

class HomeController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def index() {
        render view: '/home/home'
    }

    def getProvider() {

        def provider1 = new Provider("001", "image1", "GroupHealth", "Thomas Ferguson", "tferguson@ghc.org")
        def provider2 = new Provider("002", "image2", "Proliance Surgeons", "Proliance Surgeons", "Inovakova@proliance.com")
        def data = [provider1, provider2]
//        def map = new HashMap<String,Object>()
//        map.put("data",data)
        render data as JSON
    }
}
