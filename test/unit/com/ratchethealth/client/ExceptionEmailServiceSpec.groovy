package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.body.MultipartBody
import grails.test.mixin.TestFor
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(ExceptionEmailService)
class ExceptionEmailServiceSpec extends Specification {
    def setupSpec() {
        WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
            return null
        }
    }

    void "test Send Uncaught Exception Email"() {
        given:
        MultipartBody.metaClass.asString = { ->
            return [
                status: 400,
                body  : "body"
            ]
        }

        when:
        def stackTrace = null
        def email = 'test@xplusz.com'
        def result = service.sendExceptionEmail(stackTrace, email)

        then:
        result == false
    }
}
