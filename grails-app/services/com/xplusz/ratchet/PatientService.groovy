package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat


class PatientService {
    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def addPatients(HttpServletRequest request, HttpServletResponse response, params) {
        def patientId = params?.patientId
        def firstName = params?.firstName
        def lastName = params?.lastName
        def phoneNumber = params?.phoneNumber
        def email = params?.email
        def profilePhoto = params?.profilePhoto
        def treatmentId = params?.treatmentId
        def surgeonId = params?.staffId
        def surgeryTime = params?.surgeryTime
        def ecFirstName = params?.ecFirstName
        def ecLastName = params?.ecLastName
        def relationship = params?.relationship
        def ecEmail = params?.ecEmail

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.assignTreatments.url, request.session.clientId)
        def resp = Unirest.post(url)
                .field("patientId", patientId)
                .field("clientId", request.session.clientId)
                .field("firstName", firstName)
                .field("lastName", lastName)
                .field("phoneNumber", phoneNumber)
                .field("email", email)
                .field("profilePhoto", profilePhoto)
                .field("treatmentId", treatmentId)
                .field("surgeonId", surgeonId)
                .field("surgeryTime", surgeryTime)
                .field("ecFirstName", ecFirstName)
                .field("ecLastName", ecLastName)
                .field("relationship", relationship)
                .field("ecEmail", ecEmail)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 201) {
            return result
        }

    }

    def loadPatients(HttpServletRequest request, HttpServletResponse response, params) {

        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def draw = params?.draw
        def patientType = params?.patientType
        def treatmentId = params?.treatmentId
        def surgeonId = params?.surgeonId
        def name = params?.name

        def url = grailsApplication.config.ratchetv2.server.patients.url
        def resp = Unirest.get(url)
                .queryString("max", length)
                .queryString("offset", start)
                .queryString("clientId", request.session.clientId)
                .queryString("patientType", patientType)
                .queryString("treatmentId", treatmentId)
                .queryString("surgeonId", surgeonId)
                .queryString("name", name)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            def map = [:]

            map.put(start, start)
            map.put(length, length)
            map.put(order, order)
            map.put(columns, columns)
            map.put(search, search)
            map.put(draw, draw)
            map.put("data", result.items)
            return map
        }
    }
}
