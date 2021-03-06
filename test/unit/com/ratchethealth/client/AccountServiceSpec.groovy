package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(AccountService)
class AccountServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    def "test getAccounts with success result"() {
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
        def result = service.getAccounts('token', 1, new AccountFilterFields())

        then:
        result.recordsTotal == 2
        result.recordsFiltered == 2
        result.data == [1, 2]
    }

    def "test getAccounts without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.getAccounts('token', 1, new AccountFilterFields())

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test getSingleAccount with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            email "email"
            firstName "firstName"
        }

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.getSingleAccount('token', 1)

        then:
        result.email == "email"
        result.firstName == "firstName"
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
        service.getSingleAccount('token', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test createAccount with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            id 1
        }

        def account = new Account()

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 201,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.createAccount('token', 1, account)

        then:
        result.id == 1
    }

    def "test createAccount without successful result"() {
        given:
        def account = new Account()
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.createAccount('token', 1, account)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test updateAccount with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            email "email"
        }

        def account = new Account()
        account.accountId = "123"

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.updateAccount('token', 1, account)

        then:
        result.email == "email"
    }

    def "test updateAccount without successful result"() {
        given:
        def account = new Account()
        account.accountId = "123"

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.updateAccount('token', 1, account)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test updatePassword with successful result"() {

        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            status 200
        }

        MultipartBody.metaClass.asString = { ->
            return [
                status: 200,
                body  : jBuilder.toString()
            ]
        }

        when:
        def result = service.updatePassword('token', '1', '2', '2')
        def jsonResult = JSON.parse(result.body)

        then:
        jsonResult.status == 200
    }

    def "test updatePassword without successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 404,
                    body  : "body"
            ]
        }

        when:
        service.updatePassword('token', '1', '2', '2')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test activeStaff with successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : ''
            ]
        }

        when:
        def result = service.activateStaff('token', '1', 'false', '2', '2')

        then:
        result == true
    }

    def "test activeStaff without successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.activateStaff('token', '1', 'false', '2', '2')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test deactivateAccount with successful result"() {
        given:

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.deactivateAccount('token', 1)

        then:
        result == true
    }

    def "test deactivateAccount without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.deactivateAccount('token', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test activateAccount with successful result"() {
        given:

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.activateAccount('token', 1)

        then:
        result == true
    }

    def "test activateAccount without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.activateAccount('token', 1)

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test confirmCode with successful result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            hasProfile true
        }
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : jBuilder.toString()
            ]
        }


        when:
        def result = service.confirmCode('token', '123456')

        then:
        result.hasProfile == true
    }

    def "test confirmCode with expire result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            errorId 412
        }
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 412,
                    body  : jBuilder.toString()
            ]
        }


        when:
        def result = service.confirmCode('token', '123456')

        then:
        result.errorId == 412
    }

    def "test confirmCode without successful result"() {
        given:
        HttpRequestWithBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.confirmCode('token', '123456')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test askForResetPassword with successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.askForResetPassword('token', 'email', 'client')

        then:
        result.status == 200
    }

    def "test resetPassword with successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.resetPassword('token', "123456", '1', '1')

        then:
        result == true
    }

    def "test resetPassword without successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.resetPassword('token', "123456", '1', '1')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test validPasswordCode with successful result"() {
        given:

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : '200'
            ]
        }


        when:
        def result = service.validPasswordCode('token', '123456')

        then:
        result == 200
    }

    def "test validPasswordCode with expire result"() {
        given:
        def jBuilder = new JsonBuilder()
        jBuilder {
            errorId '412'
        }
        GetRequest.metaClass.asString = { ->
            return [
                    status: 412,
                    body  : jBuilder.toString()
            ]
        }


        when:
        def result = service.validPasswordCode('token', '123456')

        then:
        result.errorId == '412'
    }

    def "test validPasswordCode without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.validPasswordCode('token', '123456')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

    def "test checkEmail with successful result"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : true
            ]
        }

        when:
        def result = service.checkEmail('token', 'email')

        then:
        result.check == "true"
    }

    def "test checkEmail with not find result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 404,
                    body  : false
            ]
        }

        when:
        def result = service.checkEmail('token', 'email')

        then:
        result.check == "false"
    }

    def "test checkEmail without successful result"() {
        given:

        MultipartBody.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.checkEmail('token', 'email')
        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }

}
