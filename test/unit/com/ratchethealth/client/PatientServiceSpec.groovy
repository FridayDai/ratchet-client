package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(PatientService)
class PatientServiceSpec extends Specification {

    def "test addPatients with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            id 1
        }

        def patient = new Patient()
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 201,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.addPatients('token', 1, patient)

        then:
        result.id == 1
    }

    def "test addPatients without successful result"() {
        given:
        def patient = new Patient()
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.addPatients('token', 1, patient)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test loadPatients with success result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            totalCount 2
            items 1, 2
        }

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.loadPatients('token', 1, new PatientPagination())

        then:
        result.recordsTotal == 2
        result.recordsFiltered == 2
        result.data == [1, 2]
    }

    def "test loadPatients without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.loadPatients('token', 1, new PatientPagination())

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
