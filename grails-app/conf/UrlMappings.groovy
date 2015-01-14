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
        "/getPatients"(controller: "patient", action: "getPatients")
        "/patientActivity"(controller: "patientActivity", action: "index")
        "/getActivities"(controller: "patient", action: "getActivities")
        "/patientDetail"(controller: "patientTreatment", action: "index")
        "/patientOverview"(controller: "patientOverview", action: "index")
        "/patientTask"(controller: "patientOverview", action: "index")
        "/patientTeam"(controller: "patientTeam", action: "index")

        // Accounts
        "/accounts"(controller: "accounts", action: "index")
        "500"(view: '/pages/error')
        "/providers/detail"(controller: "providers",action: "detail")

    }
}
