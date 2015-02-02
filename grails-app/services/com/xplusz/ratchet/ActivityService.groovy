package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

@Transactional
class ActivityService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getActivity(HttpServletRequest request, HttpServletResponse response, params) {
        def patientId = params?.patientId
        def max = params?.max
        def offset = params?.offset
        def medicalRecordId = params?.medicalRecordId

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getActivity.url, patientId, medicalRecordId)
        def resp = Unirest.get(url)
                .queryString("max", max)
                .queryString("offset", offset)
                .asString()

        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result.items
        }

    }

    def getActivities(HttpServletRequest request, HttpServletResponse response, params) {
        def patientId = params?.patientId
        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def draw = params?.draw
        def medicalRecordId = params?.medicalRecordId

        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.getActivity.url, patientId, medicalRecordId)
        def resp = Unirest.get(url)
                .queryString("max", length)
                .queryString("offset", draw - 1)
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
