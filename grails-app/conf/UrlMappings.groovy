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
        "/patient/patientActivity"(controller: "patient", action: "showActivity")
        "/getActivities"(controller: "patient", action: "getActivities")

        // Accounts
        "/accounts"(controller: "accounts", action: "index")
        "/patientDetail"(controller: "patientDetail", action: "index")
        "/patientOverview"(controller: "patientDetail", action: "overview")
        "500"(view: '/pages/error')
        "/providers/detail"(controller: "providers",action: "detail")

    }
}
