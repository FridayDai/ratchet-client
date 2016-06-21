package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(PatientDashboardService)
class PatientDashboardServiceSpec extends Specification {
	def setupSpec() {
		WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
			return null
		}
	}

	def "test showSinglePatient with successful result"() {
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
		def result = service.showSinglePatient('token', 1)

		then:
		result.email == "email"
		result.firstName == "firstName"
	}

	def "test showSinglePatient without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.showSinglePatient('token', 1)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test showMedialRecords with successful result"() {
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
		def result = service.showMedialRecords('token', 1, 2)

		then:
		result.email == "email"
		result.firstName == "firstName"
	}

	def "test showMedialRecords without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.showMedialRecords('token', 1, 2)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test updateSinglePatient with successful result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			code "code"
		}

		MultipartBody.metaClass.asString = { ->
			return [
					status: 200,
					body  : jBuilder.toString()
			]
		}

		Patient patient = new Patient()
		patient.id = 'id'
		patient.patientId = 'patientId'
		patient.firstName = 'firstName'
		patient.lastName = 'lastName'
		patient.phoneNumber = '11111111'
		patient.email = 'email'
		patient.profilePhoto = 'profilePhoto'
		patient.treatmentId = 111111
		patient.staffId = 222222
		patient.absoluteEventTimestamp = 123456789
		patient.ecFirstName = 'ecFirstName'
		patient.ecLastName = 'ecLastName'
		patient.relationship = 'relationship'
		patient.ecEmail = 'ecEmail'
		patient.groupId = 333333
		patient.clientId = 444444

		when:
		def result = service.updateSinglePatient('token', patient)

		then:
		result.code == "code"
	}

	def "test updateSinglePatient without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		Patient patient = new Patient()
		patient.id = 'id'
		patient.patientId = 'patientId'
		patient.firstName = 'firstName'
		patient.lastName = 'lastName'
		patient.phoneNumber = '11111111'
		patient.email = 'email'
		patient.profilePhoto = 'profilePhoto'
		patient.treatmentId = 111111
		patient.staffId = 222222
		patient.absoluteEventTimestamp = 123456789
		patient.ecFirstName = 'ecFirstName'
		patient.ecLastName = 'ecLastName'
		patient.relationship = 'relationship'
		patient.ecEmail = 'ecEmail'
		patient.groupId = 333333
		patient.clientId = 444444

		when:
		service.updateSinglePatient('token', patient)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test checkPatientId with successful result"() {
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
		def result = service.checkPatientId('token', '1')

		then:
		result.email == "email"
		result.firstName == "firstName"
	}

	def "test checkPatientId without successful result as 404"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 404,
					body  : "body"
			]
		}

		when:
		def result = service.checkPatientId('token', '1')

		then:
		result.check == 'false'
	}

	def "test checkPatientId without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.checkPatientId('token', '1')

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test checkPatientEmail with successful result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			email "email"
			firstName "firstName"
		}

		MultipartBody.metaClass.asString = { ->
			return [
					status: 200,
					body  : jBuilder.toString()
			]
		}

		when:
		def result = service.checkPatientEmail('token', 1, 'email')

		then:
		result == false
	}

	def "test checkPatientEmail without successful result as 404"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 404,
					body  : "body"
			]
		}

		when:
		def result = service.checkPatientEmail('token', 1, 'email')

		then:
		result == true
	}

	def "test checkPatientEmail without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.checkPatientEmail('token', 1, 'email')

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test hasActiveTasks with successful result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			hasActiveTasks false
		}

		GetRequest.metaClass.asString = { ->
			return [
				status: 200,
				body  : jBuilder.toString()
			]
		}

		when:
		def result = service.hasActiveTasks('token', '1', '2')

		then:
		result == false
	}

	def "test hasActiveTasks without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
				status: 400,
				body  : "body"
			]
		}

		when:
		service.hasActiveTasks('token', '1', '2')

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}
}
