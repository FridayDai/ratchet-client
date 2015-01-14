class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        // Login and Logout
        "/login"(controller: "authentication", action: "login")
        "/logout"(controller: "authentication", action: 'logout')

        // Home
        "/"(controller: "home", action: "index")
        "/getProvider"(controller: "home", action: "getProvider")

        // Patients
        "/getPatients"(controller: "patient", action: "getPatients")
        "/patient/patientActivity"(controller: "patient", action: "showActivity")
        "/getActivities"(controller: "patient", action: "getActivities")

        // Accounts
        "/accounts"(controller: "accounts", action: "index")

        // Error
        "500"(view: '/pages/error')


    }
}
