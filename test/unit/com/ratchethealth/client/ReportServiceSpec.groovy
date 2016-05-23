package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(ReportService)
class ReportServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test getProviderAverageOnOverview with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            id 1
        }

        MultipartBody.metaClass.asString = { ->
            return [
                status: 200,
                body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.getProviderAverageOnOverview('token', 1, 1, 1, 1, false, 2015)

        then:
        result.id == 1
    }

    def "test getProviderAverageOnOverview without successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.getProviderAverageOnOverview('token', 1, 1, 1, 1, false, 2015)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test task completion conversion with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            total 10
        }

        MultipartBody.metaClass.asString = { ->
            return [
                status: 200,
                body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.taskCompletionConversion('token', 1, 1)

        then:
        result.total == 10
    }

    def "test task completion conversion without successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.taskCompletionConversion('token', 1, 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test getIndividualReport with successful result"() {
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
        def result = service.getIndividualReport('token', 1, 1, 1)

        then:
        result.items == [1, 2]
    }

    def "test getIndividualReport without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.getIndividualReport('token', 1, 1, 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test getPatientTools with success result"() {
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
        def result = service.getPatientTools('token', 1, 1)

        then:
        result.items == [1, 2]
    }

    def "test getPatientTools without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        service.getPatientTools('token', 1, 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
