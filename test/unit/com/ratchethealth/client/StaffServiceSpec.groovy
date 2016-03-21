package com.ratchethealth.client

import com.mashape.unirest.request.GetRequest
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.test.mixin.TestFor
import groovy.json.JsonBuilder
import org.codehaus.groovy.grails.web.util.WebUtils
import spock.lang.Specification

@TestFor(StaffService)
class StaffServiceSpec extends Specification {
	def setupSpec() {
		WebUtils.metaClass.'static'.retrieveGrailsWebRequest = { ->
			return null
		}
	}

	def "test getStaffs with success result"() {
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

		Staff staff = new Staff()
		staff.max = 10
		staff.offset = 10
		staff.type = 3
		staff.name = 'name'
		staff.groupId = 2222

		when:
		def result = service.getStaffs('token', 1, staff)

		then:
		result == [1, 2]
	}

	def "test getStaffs without successful result"() {
		given:
		GetRequest.metaClass.asString = { ->
			return [
					status: 400,
					body  : "body"
			]
		}

		Staff staff = new Staff()
		staff.max = 10
		staff.offset = 10
		staff.type = 3
		staff.name = 'name'
		staff.groupId = 2222

		when:
		service.getStaffs('token', 1, staff)

		then:
		ApiReturnException e = thrown()
		e.getMessage() == "body"
	}
}
