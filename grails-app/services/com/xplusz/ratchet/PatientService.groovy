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
        def email = params?.email
        def firstName = params?.firstName
        def lastName = params?.lastName
        def phoneNumber = params?.phoneNumber
        def profilePhoto = params?.profilePhoto
        def patientId = params?.patientId
        def treatmentId = params?.treatmentId
        def surgeryTime = params?.surgeryTime
        def primaryStaffId = params?.primaryStaffId
        def staffIds = params.staffIds

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.addPatient.url, patientId)
        def resp = Unirest.post(url)
                .field("email", email)
                .field("firstName", firstName)
                .field("lastName", lastName)
                .field("phoneNumber", phoneNumber)
                .field("profilePhoto", profilePhoto)
                .field("clientId", request.session.clientId)
                .field("treatmentId", treatmentId)
                .field("surgeryTime", surgeryTime)
                .field("primaryStaffId", primaryStaffId)
                .field("staffIds", staffIds)
                .asString()

        if (resp.status == 201) {
            return true
        }

    }

    def loadPatients(HttpServletRequest request, HttpServletResponse response, params) {

        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def draw = params?.draw

        def url = grailsApplication.config.ratchetv2.server.patients.url
        def resp = Unirest.get(url)
                .queryString("max", length)
                .queryString("offset", start)
                .queryString("clientId", request.session.clientId)
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
