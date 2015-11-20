package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import spock.lang.Specification

@TestFor(TaskService)
class TaskServiceSpec extends Specification {
	def "test getTasks with success result"() {
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
		def result = service.getTasks('token', 1, 2)

		then:
		result.totalCount == 2
		result.items == [1, 2]
	}

	def "test getTasks without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.getTasks('token', 1, 2)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test sendTaskEmailToPatient with success result"() {
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
		def result = service.sendTaskEmailToPatient('token', 1, 2, 3, 4)

		then:
		result == true
	}

	def "test sendTaskEmailToPatient without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.sendTaskEmailToPatient('token', 1, 2, 3, 4)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}

	def "test deleteTask with successful result"() {
		given:
		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 204,
					body  : ''
			]
		}

		when:
		def result = service.deleteTask('token', 1, 2, 3, 4)

		then:
		result == true
	}

	def "test deleteTask without successful result"() {
		given:
		HttpRequestWithBody.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		when:
		service.deleteTask('token', 1, 2, 3, 4)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}
}
