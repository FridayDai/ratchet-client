package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import com.mashape.unirest.http.exceptions.UnirestException
import com.xplusz.ratchet.exceptions.ApiAccessException
import com.xplusz.ratchet.exceptions.ApiReturnException
import grails.converters.JSON

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

class ActivityService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def messageSource

    def getActivity(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def patientId = params?.patientId
        def max = params?.max
        def offset = params?.offset
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId

        String getActivityUrl = grailsApplication.config.ratchetv2.server.url.getActivity
        def url = String.format(getActivityUrl, clientId, patientId, medicalRecordId)

        try {
            log.info("Call backend service to get activity with max and offset, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .queryString("max", max)
                    .queryString("offset", offset)
                    .asString()

            def result = JSON.parse(resp.body)

            if (resp.status == 200) {
                log.info("Get activity success, token: ${request.session.token}.")
                return result.items
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        }
        catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

    def getActivities(HttpServletRequest request, HttpServletResponse response, params)
            throws ApiAccessException, ApiReturnException {
        def patientId = params?.patientId
        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search
        def draw = params?.draw
        def medicalRecordId = params?.medicalRecordId
        def clientId = params?.clientId
        def senderId = params?.senderId

        String getActivityUrl = grailsApplication.config.ratchetv2.server.url.getActivity
        def url = String.format(getActivityUrl, clientId, patientId, medicalRecordId)

        try {
            log.info("Call backend service to get activities with max, offset and senderId, token: ${request.session.token}.")
            def resp = Unirest.get(url)
                    .queryString("max", length)
                    .queryString("offset", start)
                    .queryString("senderId", senderId)
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
                map.put("recordsTotal", result.totalCount)
                map.put("recordsFiltered", result.totalCount)
                map.put("data", result.items)
                log.info("Get activities success, token: ${request.session.token}.")
                return map
            } else {
                def message = result?.error?.errorMessage
                throw new ApiReturnException(resp.status, message)
            }
        }
        catch (UnirestException e) {
            throw new ApiAccessException(e.message)
        }

    }

}
