class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: "patients", action: "index")
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
        "/clients/$clientId?/patients/$patientId?/surgery-time/$medicalRecordId?/$surgeryTime?"(controller: "treatment", action: "updateSurgeryTime")


        "/team"(controller: "team", action: "showMedicalCares")
        "/getCareTeam"(controller: "team", action: "getCareTeam")
        "/getCareGiver"(controller: "team", action: "getCareGiver")
        "/clients/$clientId?/patients/$patientId?/care_team/$careTeamId?/$medicalRecordId?"(controller: "team", action: "deleteCareTeam")
        "/clients/$clientId?/patients/$patientId?/care_giver/$careGiverId?/$medicalRecordId?"(controller: "team", action: "deleteCareGiver")
        "/clients/$clientId?/patients/$patientId?/care_team"(controller: "team", action: "addCareTeam")
        "/clients/$clientId?/patients/$patientId?/care_giver"(controller: "team", action: "addCareGiver")

        "/overview"(controller: "overview", action: "index")
        "/getActivities"(controller: "overview", action: "getActivities")
        "/task"(controller: "overview", action: "index")
        "/team"(controller: "team", action: "showMedicalCares")
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
        "/getAccounts"(controller: "accounts", action: "getAccounts")
        "/singleAccount/$id?"(controller: "accounts", action: "getSingleAccount")
        "/createAccount"(controller: "accounts", action: "createAccount")
        "/updateAccount/$id?"(controller: "accounts", action: "updateAccount")

        //task
        "/patients/$patientId/treatments/$treatmentId/$medicalRecordId/tasks"(controller: "task", action: "getTasksAndTools")
        "/patients/$patientId/treatments/$medicalRecordId/task"(controller: "task", action: "addTaskToMedicalRecord")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/sendMail"(controller: "task", action: "sendTaskEmail")

        "500"(view: '/pages/error')
        "/providers/detail"(controller: "providers", action: "detail")

    }
}
