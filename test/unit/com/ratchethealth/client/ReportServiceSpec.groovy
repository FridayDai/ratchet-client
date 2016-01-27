package com.ratchethealth.client

import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(ReportService)
class ReportServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
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
}
