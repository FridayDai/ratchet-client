class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/login"(controller: "authentication", action: "login")
        "/logout"(controller: "authentication", action: 'logout')

        // Health check
        "/healthcheck"(controller: "healthCheck", action: "index")

        // Password
        "/forgot_password"(controller: "accounts") {
            action = [GET: "getForgotPassword", POST: "forgotPassword"]
        }
        "/confirm_password"(controller: "accounts") {
            action = [POST: "confirmPassword"]
        }
        "/reset_password/$code?"(controller: "accounts", action: "resetPassword")

        // Patients
        "/"(controller: "patients", action: "getPatients")

        "/patients"(controller: "patients") {
            action = [GET: "getPatients", POST: "addPatient"]
        }

        "/patients/$patientId?"(controller: "singlePatient") {
            action = [GET: "getSinglePatient", POST: "updateSinglePatient"]
        }

        "/patients/bulk_import/sample_download"(controller: "patients", action: "downloadFile")
        "/patients/bulk_import/upload"(controller: "patients", action: "uploadFile")
        "/patients/bulk_import/lookup"(controller: "patients", action: "lookup")
        "/patients/bulk_import/save"(controller: "patients", action: "savePatients")

        "/patients/$id?/invite"(controller: "singlePatient", action: "invitePatient")
        "/patients/$patientId?/check_id"(controller: "patients", action: "checkPatientExist")
        "/patients/check_email"(controller: "patients", action: "checkPatientEmailExist")


        "/patients/$patientId?/treatments"(controller: "treatment", action: "assignTreatment")
        "/patients/$patientId?/surgery-time/$medicalRecordId?/$surgeryTime?"(controller: "treatment", action: "updateSurgeryTime")
        "/patients/$patientId?/records/$medicalRecordId?/archived"(controller: "treatment", action: "archived")

//        "/patients/$patientId?/surgery-time/$medicalRecordId?/$surgeryTime?"(controller: "treatment", action: "updateSurgeryTime")
//        "/patients/$patientId?/records/$medicalRecordId?/archived"(controller: "treatment", action: "archived")

//        "/getPatients"(controller: "patients", action: "getPatients")
//        "/addPatient"(controller: "patients", action: "addPatient")
//        "/patients"(controller: "patients", action: "index")
//        "/patients/$id?"(controller: "singlePatient", action: "getSinglePatient")
//        "/clients/$clientId?/patients/$patientId?"(controller: "singlePatient", action: "updateSinglePatient")

//        "/clients/$clientId?/patients/$patientId?/treatments"(controller: "treatment", action: "assignTreatment")
//        "/clients/$clientId?/patients/$patientId?/surgery-time/$medicalRecordId?/$surgeryTime?"(controller: "treatment", action: "updateSurgeryTime")
//        "/clients/$clientId?/patients/$patientId?/records/$medicalRecordId?/archived"(controller: "treatment", action: "archived")
//        "/invitePatient/$id?"(controller: "singlePatient", action: "invitePatient")
//        "/bulk_import/download"(controller: "patients", action: "downloadFile")
//        "/upload"(controller: "patients", action: "uploadFile")
//        "/lookup"(controller: "patients", action: "lookup")
//        "/savePatients"(controller: "patients", action: "savePatients")
//        "/checkPatientId/$patientId?"(controller: "patients", action: "checkPatientExist")
//        "/checkPatientEmail"(controller: "patients", action: "checkPatientEmailExist")

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

//        "/overview"(controller: "overview", action: "index")
        "/patients/$patientId?/activities"(controller: "overview", action: "getActivities")
//        "/task"(controller: "overview", action: "index")
//        "/team"(controller: "team", action: "showMedicalCares")
//        "/patient/patientTeam"(controller: "patients", action: "showActivity")


        // treatment
//        "/treatment/task"(controller: "task", action: "getTasks")
        "/patients/$patientId?/treatment"(controller: "treatment", action: "index")
        "/treatments"(controller: "treatment", action: "getTreatments")
        "/treatments/$treatmentId?"(controller: "treatment", action: "getTreatmentInfo")

        //task
        "/patients/$patientId/treatments/$treatmentId/$medicalRecordId/tasks"(controller: "task", action: "getTasksAndTools")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/sendMail"(controller: "task", action: "sendTaskEmail")

        // Accounts
        "/staff/email/confirmation/$code?"(controller: "accounts", action: "confirmCode")
        "/userProfile/$accountId?"(controller: "profile", action: "getProfile")
        "/updatePassword"(controller: "accounts", action: "updatePassword")
        "/accounts"(controller: "accounts", action: "index")
        "/getAccounts"(controller: "accounts", action: "getAccounts")
        "/accounts/$id?"(controller: "accounts", action: "getSingleAccount")
        "/createAccount"(controller: "accounts", action: "createAccount")
        "/updateAccount"(controller: "accounts", action: "updateAccount")
        "/inviteAccount/$accountId?"(controller: "accounts", action: "inviteAccount")
        "/deactivateAccount/$accountId?"(controller: "accounts", action: "deactivateAccount")
        "/activateAccount/$accountId?"(controller: "accounts", action: "activateAccount")

        // staffs (a type of account)
        "/staffs"(controller: "staff", action: "getStaff")

        // groups
        "/groups"(controller: "groups", action: "index")
        "/getGroups"(controller: "groups", action: "getGroups")
        "/getStaffGroups"(controller: "groups", action: "getStaffGroups")
        "/createGroup"(controller: "groups", action: "addGroup")
        "/updateGroup"(controller: "groups", action: "updateGroup")
        "/deleteGroup"(controller: "groups", action: "deleteGroup")


        //agreement
//        "/terms_of_service"(controller: "home", action: "termsOfService")
//        "/privacy_policy"(controller: "home", action: "privacyPolicy")

        // announcement
        "/announcement/close"(controller: "announcement", action: "close")

        // Help
        "/addAssist"(controller: "assist", action: "addAssist")

        "500"(view: '/error/error')
        "/providers/detail"(controller: "providers", action: "detail")
        "404"(view: '/error/error404')


    }
}
