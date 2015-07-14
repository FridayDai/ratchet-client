package com.ratchethealth.client

import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(BulkImportService)
class BulkImportServiceSpec extends Specification {

    def "test uploadPatients with success result"() {
        given:

        def jBuilder = new JsonBuilder()
        jBuilder {
            items 1
        }

        def importFile = [
            'fileItem': ['fileName': 'hello'],
            'transferTo': { file -> return true }
        ]

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.uploadPatients('token', 1, importFile)

        then:
        result.data == 1
    }

    def "test uploadPatients with 209 result"() {
        given:

        def importFile = [
                'fileItem': ['fileName': 'hello'],
                'transferTo': { file -> return true }
        ]

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 209,
                    body  : 'body'
            ]
        }

        when:
        service.uploadPatients('token', 1, importFile)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == ''
    }

    def "test uploadPatients without successful result"() {
        given:

        def importFile = [
                'fileItem': ['fileName': 'hello'],
                'transferTo': { file -> return true }
        ]

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : 'body'
            ]
        }

        when:
        service.uploadPatients('token', 1, importFile)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

}
