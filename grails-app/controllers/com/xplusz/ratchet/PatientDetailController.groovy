package com.xplusz.ratchet

class PatientDetailController {

    def index() {
        render view: '/patientDetail/patientDetail'
    }

    def overview(){
        render view: '/patientDetail/patientOverview'
    }

    def activity(){
        render view: '/patientDetail/patientActivity'
    }

    def task(){
        render view: '/patientDetail/patientTask'
    }

    def team(){
        render view: '/patientDetail/patientTeam'
    }
}
