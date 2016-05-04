package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(CaregiverService)
class CaregiverServiceSpec extends Specification {
	def setupSpec() {
		WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
			return null
		}
	}

	def "test getCaregiver with successful result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			items {
				email "email"
				firstName "firstName"
			}
		}

		GetRequest.metaClass.asString = { ->
			return [
					status: 200,
					body  : jBuilder.toString()
			]
		}

		when:
		def result = service.getCaregiver('token', 1, 2, null)

		then:
		result.items.email == "email"
		result.items.firstName == "firstName"
	}

	def "test getCaregiver without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.getCaregiver('token', 1, 2, null)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test deleteCaregiver with successful result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			email "email"
			firstName "firstName"
		}

		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 204,
					body  : jBuilder.toString()
			]
		}

		when:
		def result = service.deleteCaregiver('token', 1, 2)

		then:
		result == true
	}

	def "test deleteCaregiver without successful result"() {
		given:
		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.deleteCaregiver('token', 1, 2)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test addCaregiver with successful result"() {
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

		Caregiver caregiver = new Caregiver()
		caregiver.medicalRecordId = 111111
		caregiver.caregiverId = 222222
		caregiver.email = 'email'
		caregiver.firstName = 'firstName'
		caregiver.lastName = 'lastName'
		caregiver.relationship = 'relationship'

		when:
		def result = service.addCaregiver('token', caregiver)

		then:
		result == true
	}

	def "test addCaregiver without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		Caregiver caregiver = new Caregiver()
		caregiver.medicalRecordId = 111111
		caregiver.caregiverId = 222222
		caregiver.email = 'email'
		caregiver.firstName = 'firstName'
		caregiver.lastName = 'lastName'
		caregiver.relationship = 'relationship'

		when:
		service.addCaregiver('token', caregiver)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test updateCaregiver with successful result"() {
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

		Caregiver caregiver = new Caregiver()
		caregiver.medicalRecordId = 111111
		caregiver.caregiverId = 222222
		caregiver.email = 'email'
		caregiver.firstName = 'firstName'
		caregiver.lastName = 'lastName'
		caregiver.relationship = 'relationship'

		when:
		def result = service.updateCaregiver('token', caregiver)

		then:
		result == true
	}

	def "test updateCaregiver without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		Caregiver caregiver = new Caregiver()
		caregiver.medicalRecordId = 111111
		caregiver.caregiverId = 222222
		caregiver.email = 'email'
		caregiver.firstName = 'firstName'
		caregiver.lastName = 'lastName'
		caregiver.relationship = 'relationship'

		when:
		service.updateCaregiver('token', caregiver)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

    def "test checkCaregiverEmail with successful result"() {
        given:

        GetRequest.metaClass.asString = { ->
            return [
                    status: 200,
                    body  : "body"
            ]
        }

        when:
        def result = service.checkEmailForCaregiver('token', 1, 'email')

        then:
        result.existed == true
    }

    def "test checkPatientEmail without successful result as 404"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 404,
                    body  : "body"
            ]
        }

        when:
        def result = service.checkEmailForCaregiver('token', 1, 'email')

        then:
        result.existed == false
    }

    def "test checkPatientEmail without successful result"() {
        given:
        GetRequest.metaClass.asString = { ->
            return [
                    status: 400,
                    body  : "body"
            ]
        }

        when:
        service.checkEmailForCaregiver('token', 1, 'email')

        then:
        ApiReturnException e = thrown()
        e.getMessage() == "body"
    }
}
