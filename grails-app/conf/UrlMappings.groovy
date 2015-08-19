import org.apache.tools.ant.taskdefs.Get

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
        "/forgot-password"(controller: "accounts") {
            action = [GET: "getForgotPassword", POST: "forgotPassword"]
        }
        "/confirm-password"(controller: "accounts") {
            action = [POST: "confirmPassword"]
        }
        "/reset-password/$code?"(controller: "accounts", action: "resetPassword")

        "/confirm-reset-password"(controller: "accounts", action: "confirmResetPassword")

        // Patients
        "/"(controller: "patients", action: "getPatients")

        "/patients"(controller: "patients") {
            action = [GET: "getPatients", POST: "addPatient"]
        }

        "/patients/$patientId?"(controller: "singlePatient") {
            action = [GET: "getSinglePatient", POST: "updateSinglePatient"]
        }

        "/patients/bulk-import/sample-download"(controller: "patients", action: "downloadFile")
        "/patients/bulk-import/upload"(controller: "patients", action: "uploadFile")
        "/patients/bulk-import/lookup"(controller: "patients", action: "lookup")
        "/patients/bulk-import/save"(controller: "patients", action: "savePatients")
        "/patients/bulk-import/download-errors"(controller: "patients", action: "downloadErrors")

        "/patients/$id?/invite"(controller: "singlePatient", action: "invitePatient")
        "/patients/check-id"(controller: "singlePatient", action: "checkPatientExist")
        "/patients/check-email"(controller: "singlePatient", action: "checkPatientEmailExist")

        "/patients/$patientId?/treatments"(controller: "treatment", action: "assignTreatment")
        "/patients/$patientId?/surgery-time/$medicalRecordId?/$surgeryTime?"(controller: "treatment", action: "updateSurgeryTime")
        "/patients/$patientId?/records/$medicalRecordId?/archived"(controller: "treatment", action: "archived")

        //Patient treatment
        "/patients/$patientId?/treatment"(controller: "treatment", action: "index")
        "/treatments"(controller: "treatment", action: "getTreatments")
        "/treatments/$treatmentId?"(controller: "treatment", action: "getTreatmentInfo")
        "/treatments/$treatmentId?/generateCode"(controller: "treatment", action: "generateTreatmentCode")

        //Patient task
        "/patients/$patientId/treatments/$medicalRecordId/tasks"(controller: "task", action: "getTasks")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/send-mail"(controller: "task", action: "sendTaskEmail")

        //Patient team
        "/patients/$patientId?/emergency-contact"(controller: "team") {
            action = [GET: "getCareGiver", POST: "addCareGiver"]
        }

        "/patients/$patientId?/$medicalRecordId?/emergency-contact/$emergencyContactId?"(controller: "team", action: "deleteCareGiver")
        "/patients/$patientId?/emergency-contact/update"(controller: "team", action: "updateCareGiver")
        "/patients/$patientId?/group-and-provider/update"(controller: "team", action: "updateCareTeamSurgeon")
        "/patients/$medicalRecordId?/emergency-contact/check-email"(controller: "team", action: "checkCareGiverEmail")

        //Patient activity
        "/patients/$patientId?/activities"(controller: "activity", action: "getActivities")

        //Accounts
        "/accounts"(controller: "accounts") {
            action = [GET: "getAccounts", POST: "addAccount"]
        }

        "/accounts/$id?"(controller: "accounts") {
            action = [GET: "getSingleAccount", POST: "updateAccount"]
        }

        "/accounts/$accountId?/invite"(controller: "accounts", action: "inviteAccount")
        "/accounts/$accountId?/activate"(controller: "accounts", action: "activateAccount")
        "/accounts/$accountId?/deactivate"(controller: "accounts", action: "deactivateAccount")
        "/accounts/$accountId?/groups"(controller: "groups", action: "getStaffGroups")
        "/accounts/check-email"(controller: "accounts", action: "checkAccountEmail")

        //email confirm to activate account
        "/email/confirmation/$code?"(controller: "accounts", action: "confirmCode")

        //Account profile
        "/profile/$accountId?"(controller: "profile") {
            action = [GET: "getProfile", POST: "updatePassword"]
        }

        // staffs (a type of account) (for now means provider)
        "/staffs"(controller: "staff", action: "getStaff")

        // groups
        "/groups"(controller: "groups") {
            action = [GET: "getGroups", POST: "addGroup"]
        }
        "/groups/update"(controller: "groups", action: "updateGroup")
        "/groups/delete"(controller: "groups", action: "deleteGroup")

        // announcement
        "/announcement/close"(controller: "announcement", action: "close")

        // Help
        "/assist-me"(controller: "assist", action: "addAssist")

        "500"(view: '/error/error')
        "404"(view: '/error/error404')
    }
}
