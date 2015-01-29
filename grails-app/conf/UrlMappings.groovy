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
        "/addPatient"(controller: "patients", action: "addPatient")
        "/activity"(controller: "activity", action: "index")
        "/patient/patientActivity"(controller: "patients", action: "showActivity")
        "/patients"(controller: "patients", action: "index")
        "/patients/$id?"(controller: "singlePatient", action: "showPatient")
        "/clients/$clientId?/patients/$patientId?"(controller: "singlePatient", action: "updatePatient")
        "/clients/$clientId?/patients/$patientId?/treatments"(controller: "treatment", action: "assignTreatment")


        "/overview"(controller: "overview", action: "index")
        "/getActivities"(controller: "overview", action: "getActivities")
        "/task"(controller: "overview", action: "index")
        "/team"(controller: "team", action: "index")
        "/patient/patientTeam"(controller: "patients", action: "showActivity")
        "/getStaffs"(controller: "staff", action: "getStaff")
        "/getCareGiver"(controller: "patients", action: "getCareGiver")

        // treatment
        "/treatment/task"(controller: "task", action: "getTasks")
        "/treatment"(controller: "treatment", action: "index")
        "/getTreatments"(controller: "treatment", action: "getTreatments")

        // Accounts
        "/accounts"(controller: "accounts", action: "index")
        "/getAccounts"(controller: "accounts", action: "getAllAccounts")
        "/singleAccount"(controller: "accounts", action: "getAccount")
        "500"(view: '/pages/error')
        "/providers/detail"(controller: "providers",action: "detail")

    }
}
