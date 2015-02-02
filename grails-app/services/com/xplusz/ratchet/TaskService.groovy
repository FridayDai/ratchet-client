package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

@Transactional
class TaskService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getOverdueTasks(HttpServletRequest request, HttpServletResponse response, params) {

        def max = params?.max
        def offset = params?.offset
        def patientId = params?.patientId
        def medicalRecordId = params?.medicalRecordId

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getOverdueTask.url, patientId, medicalRecordId)
        def resp = Unirest.get(url)
                .queryString("max", max)
                .queryString("offset", offset)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }

    }
}
