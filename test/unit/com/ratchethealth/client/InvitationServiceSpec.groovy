package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(InvitationService)
class InvitationServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test invitePatient with successful result"() {
        given:

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.invitePatient('token', 1)

        then:
        result == true
    }

    def "test getSingleAccount without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.invitePatient('token', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test inviteAccount with successful result"() {
        given:

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.inviteAccount('token', 1)

        then:
        result == true
    }

    def "test inviteAccount without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.inviteAccount('token', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
