package com.xplusz.ratchet

class TeamController {

    def patientService

    def index() {
        def teamData = patientService.loadCareTeam()
        def giverData = patientService.loadCareGiver()
        render(view: "/team/team", model: [teams: teamData, givers: giverData])
    }
}
