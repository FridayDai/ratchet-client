package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(TreatmentService)
class TreatmentServiceSpec extends Specification {
	def "test getTreatments with success result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			items 1, 2
		}

		GetRequest.metaClass.asString = { ->
			return [
					status: 200,
					body  : jBuilder.toString()
			]
		}

		when:
		def result = service.getTreatments('token', 1, 1, 1, 'title')

		then:
		result == [1, 2]
	}

	def "test getTreatments without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.getTreatments('token', 1, 1, 1, 'title')

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test assignTreatmentToExistPatient with successful result"() {
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
		patient.surgeryTime = 123456789
		patient.ecFirstName = 'ecFirstName'
		patient.ecLastName = 'ecLastName'
		patient.relationship = 'relationship'
		patient.ecEmail = 'ecEmail'
		patient.groupId = 333333
		patient.clientId = 444444

		when:
		def result = service.assignTreatmentToExistPatient('token', 1, patient)

		then:
		result.id == 1
	}

	def "test assignTreatmentToExistPatient without successful result"() {
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
		patient.surgeryTime = 123456789
		patient.ecFirstName = 'ecFirstName'
		patient.ecLastName = 'ecLastName'
		patient.relationship = 'relationship'
		patient.ecEmail = 'ecEmail'
		patient.groupId = 333333
		patient.clientId = 444444

		when:
		service.assignTreatmentToExistPatient('token', 1, patient)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test getTreatmentInfo with success result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			hello 'world'
		}

		GetRequest.metaClass.asString = { ->
			return [
					status: 200,
					body  : jBuilder.toString()
			]
		}

		when:
		def result = service.getTreatmentInfo('token', 1, 1)

		then:
		result['hello'] == 'world'
	}

	def "test getTreatmentInfo without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.getTreatmentInfo('token', 1, 1)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test updateSurgeryTime with successful result"() {
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
		def result = service.updateSurgeryTime('token', 1, 2, 3, 123456789)

		then:
		result == true
	}

	def "test updateSurgeryTime without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.updateSurgeryTime('token', 1, 2, 3, 123456789)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test archiveTreatment with successful result"() {
		given:
		def jBuilder = new JsonBuilder()
		jBuilder {
			id 1
		}

		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 200,
					body  : jBuilder.toString()
			]
		}

		when:
		def result = service.archiveTreatment('token', 1, 2, 3)

		then:
		result == true
	}

	def "test archiveTreatment without successful result"() {
		given:
		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.archiveTreatment('token', 1, 2, 3)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}
}
