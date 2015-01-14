package com.xplusz.ratchet

import grails.converters.JSON

class PatientController extends BaseController {

    //    def beforeInterceptor = [action: this.&auth]

    def patientService

    def index() {
        render view: '/patient/patientList'
    }

    def getPatients() {
        def data = patientService.loadPatients(params)
        render data as JSON
    }


    def showActivity() {
        render view: "/patient/patientTeam"
    }

    def getActivities() {
        def selectLevel = params?.selectLevel
        def selectBy = params?.selectBy
        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search

        def data
        if (selectLevel == "all") {
            if (selectBy == "all") {
                def activity1 = new Activity("001", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity2 = new Activity("002", "Task 'SDM' is sent to patient", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity8 = new Activity("008", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity9 = new Activity("009", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity10 = new Activity("010", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity11 = new Activity("011", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity12 = new Activity("012", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity13 = new Activity("013", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity14 = new Activity("014", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity15 = new Activity("015", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                data = [activity1, activity2, activity3, activity4, activity5, activity6, activity7, activity8, activity9, activity10, activity11, activity12, activity13, activity14, activity15]
            } else if (selectBy == "ratchet") {
                def activity2 = new Activity("002", "Task 'SDM' is sent to patient", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity8 = new Activity("008", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity9 = new Activity("009", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                data = [activity2, activity3, activity4, activity5, activity6, activity7, activity8, activity9]
            }
        } else if (selectLevel == "critical") {
            if (selectBy == "all") {
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity10 = new Activity("010", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity11 = new Activity("011", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                data = [activity3, activity4, activity5, activity6, activity7, activity10, activity11]
            } else if (selectBy == "ratchet") {
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                data = [activity3, activity4, activity5, activity6, activity7]
            }
        } else if (selectLevel == "normal") {
            def activity1 = new Activity("001", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
            def activity2 = new Activity("002", "Task 'SDM' is sent to patient", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
            data = [activity1, activity2]
        }
        def map = [:]
        map.put(start, start)
        map.put(length, length)
        map.put(order, order)
        map.put(columns, columns)
        map.put(search, search)

        map.put("data", data)
        render map as JSON
    }

}
