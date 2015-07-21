package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(AnnouncementService)
class AnnouncementServiceSpec extends Specification {
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
