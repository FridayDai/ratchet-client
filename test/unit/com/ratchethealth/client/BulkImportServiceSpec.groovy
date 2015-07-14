package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
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
                'fileItem'  : ['fileName': 'hello'],
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
                'fileItem'  : ['fileName': 'hello'],
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
                'fileItem'  : ['fileName': 'hello'],
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

    def "test lookup with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            totalCount 2
            items 1, 2
        }

        def bulkPagination = new BulkPagination()

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.lookup('token', 1, bulkPagination)

        then:
        result.recordsTotal == 2
        result.recordsFiltered == 2
        result.data == [1, 2]
    }

    def "test lookup without successful result"() {
        given:
        def bulkPagination = new BulkPagination()
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.lookup('token', 1, bulkPagination)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test downloadErrors with success result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            errorFilePath 2
        }

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.downloadErrors('token', 1)

        then:
        result == 2
    }

    def "test downloadErrors without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.downloadErrors('token', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test savePatients with successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : 'body'
            ]
        }

        when:
        def result = service.savePatients('token', 1, 2)

        then:
        result == [:]

    }

    def "test savePatients without successful result"() {

        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.savePatients('token', 1, 2)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }


}
