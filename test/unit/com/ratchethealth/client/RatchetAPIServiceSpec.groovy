package com.ratchethealth.client

import com.mashape.unirest.http.exceptions.UnirestException
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(RatchetAPIService)
class RatchetAPIServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test handle error with resp as null"() {
        given: "Set resp null"
        service.messageSource = [getMessage: { key, args, locale -> return "message" }]

        when: "Call handleError with resp"
        service.handleError(null)

        then: "ApiAccessException caught"
        ApiAccessException e = thrown()
        e.getMessage() == "message"
    }

    def "test handle error with resp as empty body and status code as null"() {
        given: "Set resp with status code as null"
        def resp = [
                body: 'error'
        ]
        service.messageSource = [getMessage: { key, args, locale -> return "message" }]

        when: "Call handleError with resp"
        service.handleError(resp)

        then: "ApiAccessException caught"
        ApiAccessException e = thrown()
        e.getMessage() == "message"
    }

    def "test handle error with resp as empty body and status code as 500"() {
        given: "Set resp with empty body and status code as 500"
        def resp = [
                body: '',
                status: 500
        ]

        when: "Call handleError with resp"
        service.handleError(resp)

        then: "ApiAccessException caught"
        ApiAccessException e = thrown()
        e.getMessage() == ""
    }

    def "test handle error with resp as expect message body and status code as 501"() {
        given: "Set resp with expect message body and status code as 501"
        def resp = [
                body: '{"errors": {"message": "error"}}',
                status: 501
        ]

        when: "Call handleError with resp"
        service.handleError(resp)

        then: "ApiAccessException caught"
        ApiAccessException e = thrown()
        e.getMessage() == "error"
    }

    def "test handle error with resp as unexpected message body and status code as 502"() {
        given: "Set resp with unexpected body and status code as 502"
        def resp = [
                body: '{"error": {"errorMessage": "error"}}',
                status: 502
        ]

        when: "Call handleError with resp"
        service.handleError(resp)

        then: "ApiAccessException caught"
        ApiAccessException e = thrown()
        e.getMessage() == '{"error": {"errorMessage": "error"}}'
    }

    def "test handle error with resp as expect message body and status code as 400"() {
        given: "Set resp with expect body and status code as 400"
        def resp = [
                body: '{"error": {"errorMessage": "error"}}',
                status: 400
        ]

        when: "Call handleError with resp"
        service.handleError(resp)

        then: "ServerException caught"
        ApiReturnException e = thrown()
        e.getMessage() == "error"
    }

    def "test handle error with resp as unexpected message body and status code as 401"() {
        given: "Set resp with unexpected body and status code as 401"
        def resp = [
                body: '{"errors": {"message": "error"}}',
                status: 401
        ]

        when: "Call handleError with resp"
        service.handleError(resp)

        then: "ServerException caught"
        ApiReturnException e = thrown()
        e.getMessage() == '{"errors": {"message": "error"}}'
    }

    def "test withReq with token"() {
        given: "Setup req object"
        def map = [:]
        def req = [header: { key, val -> map.put(key, val) }]

        def closure = {obj -> return obj}

        when: "Call withReq with token"
        service.withReq(req, 'token', closure)

        then: "Can get token value for key X-Auth-Token"
        map.get('X-Auth-Token') == "token"
    }

    def "test withReq without token"() {
        given: "Setup req object"
        def map = [:]
        def req = [header: { key, val -> map.put(key, val) }]

        def closure = {obj -> return obj}

        when: "Call withReq without token"
        service.withReq(req, null, closure)

        then: "Can't get token value for key X-Auth-Token"
        !map.get('X-Auth-Token')
    }

    def "test withReq with UnirestException throw in closure"() {
        given: "Setup req object"
        def map = [:]
        def req = [header: { key, val -> map.put(key, val) }]

        def closure = {obj -> throw new UnirestException("message")}

        when: "Call withReq without token"
        service.withReq(req, null, closure)

        then: "UnirestException caught"
        ApiAccessException e = thrown()
        e.getMessage() == "message"
    }

    def "test withGet without token"() {
        given: "Setup url and closure"
        def closure = {obj -> obj}

        when: "Call withGet without token"
        def result = service.withGet('url', closure)

        then: "Can't find X-Auth-Token from request header"
        !result.headers.get("X-Auth-Token")
    }

    def "test withGet with token"() {
        given: "Setup url and closure"
        def closure = {obj -> obj}

        when: "Call withGet with token"
        def result = service.withGet("token", "url", closure)

        then: "Can't find X-Auth-Token from request header"
        "token" in result.headers.get("X-Auth-Token")
    }

    def "test withPost without token"() {
        given: "Setup url and closure"
        def closure = {obj -> obj}

        when: "Call withPost without token"
        def result = service.withPost('url', closure)

        then: "Can't find X-Auth-Token from request header"
        !result.headers.get("X-Auth-Token")
    }

    def "test withPost with token"() {
        given: "Setup url and closure"
        def closure = {obj -> obj}

        when: "Call withPost with token"
        def result = service.withPost("token", "url", closure)

        then: "Can't find X-Auth-Token from request header"
        "token" in result.headers.get("X-Auth-Token")
    }

    def "test withDelete with token"() {
        given: "Setup url and closure"
        def closure = {obj -> obj}

        when: "Call withPost with token"
        def result = service.withDelete("token", "url", closure)

        then: "Can't find X-Auth-Token from request header"
        "token" in result.headers.get("X-Auth-Token")
    }
}
