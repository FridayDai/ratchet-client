package com.ratchethealth.client

import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(AssistService)
class AssistServiceSpec extends Specification {

    def "test addAssist with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            id 1
        }

        def assist = new Assist()

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 201,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.addAssist('token', 1, 2, assist)

        then:
        result.status == "ok"
    }

    def "test addAssist without successful result"() {
        given:
        def assist = new Assist()
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.addAssist('token', 1, 2, assist)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
