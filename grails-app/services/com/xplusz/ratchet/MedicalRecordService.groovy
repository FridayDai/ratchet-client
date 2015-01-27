package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import java.text.MessageFormat


class MedicalRecordService {

    /** dependency injection for grailsApplication */
    def grailsApplication

    def showTasksByMedicalRecord(medicalRecordId) {

//        def loadPageDataException = new loadPageDataException()
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.medicalRecord.tasks.url, medicalRecordId)// need format
        def resp = Unirest.get(url)
                .asString()
        def result = JSON.parse(resp.body)

        if (resp.status == 200) {
            return result
        }
//        else {
//            throw loadPageDataException
//        }

    }

    def assignTaskToMedicalRecord(params) {
        def toolId = params.toolId
        def status = params.status
        def surgeryTime = params.surgeryTime
        def sendTime, remindTime

        if (status == 2){
            sendTime = surgeryTime + params.sendMillionSeconds
        } else {
            sendTime = new Date().getTime()
        }

        if (idMessage){
            remindTime = null
        }else {
            remindTime = surgeryTime + params.remindMillionSeconds
        }

        def args = [params.patientId, params.medicalRecordId].toArray()
        def url = MessageFormat.format(grailsApplication.config.ratchetv2.server.medicalRecord.assignTask.url, args)
        def resp = Unirest.post(url)
                .field("toolId", toolId)
                .field("status", status)
                .field("sendTime", sendTime)
                .field("remindTime", remindTime)
                .asString()

        if (resp.status == 200) {
            return true
        }
        else {
            return false
        }
    }

}
