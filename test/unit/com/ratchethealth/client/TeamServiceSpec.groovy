package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.mashape.unirest.request.body.MultipartBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(TeamService)
class TeamServiceSpec extends Specification {
	def "test getCareTeam with successful result"() {
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
		def result = service.getCareTeam('token', 1)

		then:
		result.email == "email"
		result.firstName == "firstName"
	}

	def "test getCareTeam without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.getCareTeam('token', 1)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test getCareGiver with successful result"() {
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
		def result = service.getCareGiver('token', 1)

		then:
		result.data.email == "email"
		result.data.firstName == "firstName"
	}

	def "test getCareGiver without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.getCareGiver('token', 1)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test deleteCareGiver with successful result"() {
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
		def result = service.deleteCareGiver('token', 1, 2)

		then:
		result == true
	}

	def "test deleteCareGiver without successful result"() {
		given:
		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.deleteCareGiver('token', 1, 2)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test addCareGiver with successful result"() {
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

		CareGiver careGiver = new CareGiver()
		careGiver.medicalRecordId = 111111
		careGiver.careGiverId = 222222
		careGiver.email = 'email'
		careGiver.firstName = 'firstName'
		careGiver.lastName = 'lastName'
		careGiver.relationship = 'relationship'

		when:
		def result = service.addCareGiver('token', careGiver)

		then:
		result == true
	}

	def "test addCareGiver without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		CareGiver careGiver = new CareGiver()
		careGiver.medicalRecordId = 111111
		careGiver.careGiverId = 222222
		careGiver.email = 'email'
		careGiver.firstName = 'firstName'
		careGiver.lastName = 'lastName'
		careGiver.relationship = 'relationship'

		when:
		service.addCareGiver('token', careGiver)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test updateCareGiver with successful result"() {
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

		CareGiver careGiver = new CareGiver()
		careGiver.medicalRecordId = 111111
		careGiver.careGiverId = 222222
		careGiver.email = 'email'
		careGiver.firstName = 'firstName'
		careGiver.lastName = 'lastName'
		careGiver.relationship = 'relationship'

		when:
		def result = service.updateCareGiver('token', careGiver)

		then:
		result == true
	}

	def "test updateCareGiver without successful result"() {
		given:
		MultipartBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		CareGiver careGiver = new CareGiver()
		careGiver.medicalRecordId = 111111
		careGiver.careGiverId = 222222
		careGiver.email = 'email'
		careGiver.firstName = 'firstName'
		careGiver.lastName = 'lastName'
		careGiver.relationship = 'relationship'

		when:
		service.updateCareGiver('token', careGiver)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test updateCareTeamSurgeon with successful result"() {
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
		def result = service.updateCareTeamSurgeon('token', 1, 2, 3)

		then:
		result.id == 1
	}

	def "test updateCareTeamSurgeon without successful result"() {
		given:
		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.updateCareTeamSurgeon('token', 1, 2, 3)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}
}