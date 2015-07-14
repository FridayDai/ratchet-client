package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(ActivityService)
class ActivityServiceSpec extends Specification {

    def "test getActivities with success result"() {
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
        def result = service.getActivities('token', new ActivityPagination())

        then:
        result.recordsTotal == 2
        result.recordsFiltered == 2
        result.data == [1, 2]
    }

    def "test getActivities without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.getActivities('token', new ActivityPagination())

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

}