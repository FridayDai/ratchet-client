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

        //team
        "/team"(controller: "team", action: "showMedicalCares")
        "/getCareTeam"(controller: "team", action: "getCareTeam")
        "/getCareGiver"(controller: "team", action: "getCareGiver")
        "/clients/$clientId?/patients/$patientId?/care_team/$careTeamId?/$medicalRecordId?"(controller: "team", action: "deleteCareTeam")
        "/clients/$clientId?/patients/$patientId?/care_giver/$careGiverId?/$medicalRecordId?"(controller: "team", action: "deleteCareGiver")
        "/clients/$clientId?/patients/$patientId?/care_team"(controller: "team", action: "addCareTeam")
        "/clients/$clientId?/patients/$patientId?/care_giver"(controller: "team", action: "addCareGiver")
        "/updateCareGiver"(controller: "team", action: "updateCareGiver")
        "/updateCareTeamSurgeon"(controller: "team", action: "updateCareTeamSurgeon")

        "/overview"(controller: "overview", action: "index")
        "/getActivities"(controller: "overview", action: "getActivities")
        "/task"(controller: "overview", action: "index")
        "/team"(controller: "team", action: "showMedicalCares")
        "/patient/patientTeam"(controller: "patients", action: "showActivity")
        "/getStaffs"(controller: "staff", action: "getStaff")

        // treatment
        "/treatment/task"(controller: "task", action: "getTasks")
        "/treatment"(controller: "treatment", action: "index")
        "/getTreatments"(controller: "treatment", action: "getTreatments")

        // Accounts
        "/staff/email/confirmation/$code?"(controller: "accounts",action: "confirmCode")
        "/userProfile/$accountId?"(controller: "accounts", action: "getProfile")
        "/updatePassword"(controller: "accounts", action: "updatePassword")
        "/accounts"(controller: "accounts", action: "index")
        "/getAccounts"(controller: "accounts", action: "getAccounts")
        "/singleAccount/$id?"(controller: "accounts", action: "getSingleAccount")
        "/createAccount"(controller: "accounts", action: "createAccount")
        "/updateAccount"(controller: "accounts", action: "updateAccount")
        "/inviteAccount/$accountId?"(controller: "accounts", action: "inviteAccount")

        //task
        "/clients/$clientId/patients/$patientId/treatments/$treatmentId/$medicalRecordId/tasks"(controller: "task", action: "getTasksAndTools")
        "/clients/$clientId/patients/$patientId/treatments/$medicalRecordId/task"(controller: "task", action: "addTaskToMedicalRecord")
        "/clients/$clientId/patients/$patientId/treatments/$medicalRecordId/task/$taskId/sendMail"(controller: "task", action: "sendTaskEmail")

        //agreement
        "/termsOfService"(controller: "home", action: "termsOfService")
        "/privacyPolicy"(controller: "home", action: "privacyPolicy")

        "500"(view: '/error/error')
        "/providers/detail"(controller: "providers", action: "detail")
        "404"(view: '/error/error404')

    }
}
