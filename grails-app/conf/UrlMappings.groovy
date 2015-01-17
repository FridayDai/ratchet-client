class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: "home", action: "index")
        "/login"(controller: "authentication", action: "login")
        "/logout"(controller: "authentication", action: 'logout')

        // Home
        "/providers"(controller: "providers", action: "index")
        "/getProvider"(controller: "home", action: "getProvider")

        // Patients
        "/getPatients"(controller: "patients", action: "getPatients")
        "/patientActivity"(controller: "patientActivity", action: "index")
        "/patient/patientActivity"(controller: "patients", action: "showActivity")
        "/patient/patientTeam"(controller: "patients", action: "showActivity")
        "/getActivities"(controller: "patients", action: "getActivities")
        "/singlePatient"(controller: "singlePatient", action: "index")
        "/patientOverview"(controller: "patientOverview", action: "index")
        "/patientTask"(controller: "patientOverview", action: "index")
        "/patientTeam"(controller: "patientTeam", action: "index")
        "/patient/patientTeam"(controller: "patients", action: "showActivity")
        "/getCareTeam"(controller: "patients",action: "getCareTeam")
        "/getCareGiver"(controller: "patients",action: "getCareGiver")

        // treatment
        "/treatment/task"(controller: "treatment", action: "getTasks")

        // Accounts
        "/accounts"(controller: "accounts", action: "index")
        "500"(view: '/pages/error')
        "/providers/detail"(controller: "providers",action: "detail")

    }
}
