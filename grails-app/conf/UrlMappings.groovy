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

        "/confirm_reset_password"(controller: "accounts", action: "confirmResetPassword")

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
        "/patients/bulk-import/download-errors"(controller: "patients", action: "downloadErrors")

        "/patients/$id?/invite"(controller: "singlePatient", action: "invitePatient")
        "/patients/check_id"(controller: "patients", action: "checkPatientExist")
        "/patients/check_email"(controller: "patients", action: "checkPatientEmailExist")

        "/patients/$patientId?/treatments"(controller: "treatment", action: "assignTreatment")
        "/patients/$patientId?/surgery_time/$medicalRecordId?/$surgeryTime?"(controller: "treatment", action: "updateSurgeryTime")
        "/patients/$patientId?/records/$medicalRecordId?/archived"(controller: "treatment", action: "archived")

        //Patient treatment
        "/patients/$patientId?/treatment"(controller: "treatment", action: "index")
        "/treatments"(controller: "treatment", action: "getTreatments")
        "/treatments/$treatmentId?"(controller: "treatment", action: "getTreatmentInfo")

        //Patient task
        "/patients/$patientId/treatments/$treatmentId/$medicalRecordId/tasks"(controller: "task", action: "getTasksAndTools")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/sendMail"(controller: "task", action: "sendTaskEmail")

        //Patient team
        "/patients/$patientId?/emergency_contact"(controller: "team") {
            action = [GET: "getCareGiver", POST: "addCareGiver"]
        }

        "/patients/$patientId?/$medicalRecordId?/emergency_contact/$emergencyContactId?"(controller: "team", action: "deleteCareGiver")
        "/patients/$patientId?/emergency_contact/update"(controller: "team", action: "updateCareGiver")
        "/patients/$patientId?/group_and_provider/update"(controller: "team", action: "updateCareTeamSurgeon")

        //Patient activity
        "/patients/$patientId?/activities"(controller: "overview", action: "getActivities")

        // Accounts
        "/email/confirmation/$code?"(controller: "accounts", action: "confirmCode")
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

        // announcement
        "/announcement/close"(controller: "announcement", action: "close")

        // Help
        "/addAssist"(controller: "assist", action: "addAssist")

        "500"(view: '/error/error')
        "/providers/detail"(controller: "providers", action: "detail")
        "404"(view: '/error/error404')


    }
}
