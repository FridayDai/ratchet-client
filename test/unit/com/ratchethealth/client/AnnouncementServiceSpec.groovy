package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(AnnouncementService)
class AnnouncementServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test checkAnnouncement with success result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            items 1, 2
        }

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.checkAnnouncement()

        then:
        result == 1
    }
}
