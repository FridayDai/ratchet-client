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
        "/activity"(controller: "activity", action: "index")
        "/patient/patientActivity"(controller: "patients", action: "showActivity")
        "/getActivities"(controller: "patients", action: "getActivities")
        "/singlePatient"(controller: "singlePatient", action: "index")
        "/overview"(controller: "overview", action: "index")
        "/task"(controller: "overview", action: "index")
        "/team"(controller: "team", action: "index")
        "/patient/patientTeam"(controller: "patients", action: "showActivity")
        "/getCareTeam"(controller: "patients",action: "getCareTeam")
        "/getCareGiver"(controller: "patients",action: "getCareGiver")

        // treatment
        "/treatment/task"(controller: "task", action: "getTasks")
        "/treatment"(controller: "treatment", action: "index")

        // Accounts
        "/accounts"(controller: "accounts", action: "index")
        "/getAccounts"(controller: "accounts", action: "getAllAccounts")
        "/singleAccount"(controller: "accounts", action: "getAccount")
        "500"(view: '/pages/error')
        "/providers/detail"(controller: "providers",action: "detail")

    }
}
