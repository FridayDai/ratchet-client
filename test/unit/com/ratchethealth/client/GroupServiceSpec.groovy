package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.mashape.unirest.request.body.RequestBodyEntity
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification


@TestFor(GroupService)
class GroupServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test showGroupsList with successful result"() {
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

        GroupPagination groupPagination = new GroupPagination()
        groupPagination.start = 0
        groupPagination.length = 20
        groupPagination.name = 'name'
        groupPagination.sort = 'sort'
        groupPagination.order = 'order'

        when:
        def result = service.showGroupsList('token', 1, groupPagination)

        then:
        result.recordsTotal == 2
        result.recordsFiltered == 2
        result.data == [1, 2]
    }

    def "test showGroupsList without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        GroupPagination groupPagination = new GroupPagination()
        groupPagination.start = 0
        groupPagination.length = 20
        groupPagination.name = 'name'
        groupPagination.sort = 'sort'
        groupPagination.order = 'order'

        when:
        service.showGroupsList('token', 1, groupPagination)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test createGroup with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            id 1
        }

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 201,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.createGroup('token', 1, 'GroupTest')

        then:
        result.id == 1
    }

    def "test createGroup without successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.createGroup('token', 1, 'GroupTest')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test updateGroup with successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : ''
            ]
        }

        when:
        def result = service.updateGroup('token', 1, 'GroupUpdate', 1)

        then:
        result == true
    }

    def "test updateGroup without successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.updateGroup('token', 1, 'GroupUpdate', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test deleteGroup with successful result"() {
        given:
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 204,
                    body  : ''
            ]
        }

        when:
        def result = service.deleteGroup('token', 1, 1)

        then:
        result == true
    }

    def "test deleteGroup without successful result"() {
        given:
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.deleteGroup('token', 1, 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test updateTreatmentsOnGroup with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            update true
        }

        RequestBodyEntity.metaClass.asJson = { ->
            return [
                status: 200,
                body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.updateTreatmentsOnGroup('token', 1, 2, '3, 4, 5')

        then:
        result == true
    }

    def "test updateTreatmentsOnGroup without successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            update false
        }

        RequestBodyEntity.metaClass.asJson = { ->
            return [
                status: 400,
                body  : jBuilder.toString()
            ]
        }

        when:
        service.updateTreatmentsOnGroup('token', 1, 2, '3, 4, 5')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "{\"update\":false}"
    }

    def "test getStaffGroups with successful result"() {
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
        def result = service.getStaffGroups('token', 1, 1, 'GroupTest')

        then:
        result.totalCount == 2
        result.items == [1, 2]
    }

    def "test getStaffGroups without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.getStaffGroups('token', 1, 1, 'GroupTest')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
