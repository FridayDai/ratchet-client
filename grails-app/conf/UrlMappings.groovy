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

        //email confirm to activate account
        "/email_confirm/$code?"(controller: "accounts", action: "confirmCode")

        //Account profile
        "/profile/$accountId?"(controller: "profile") {
            action = [GET: "getProfile", POST: "updatePassword"]
        }

        // staffs (a type of account)
        "/staffs"(controller: "staff", action: "getStaff")

        // groups
        "/groups"(controller: "groups") {
            action = [GET: "getGroups", POST: "addGroup"]
        }
        "/groups/update"(controller: "groups", action: "updateGroup")
        "/groups/delete"(controller: "groups", action: "deleteGroup")

        "/getStaffGroups"(controller: "groups", action: "getStaffGroups")

        // announcement
        "/announcement/close"(controller: "announcement", action: "close")

        // Help
        "/addAssist"(controller: "assist", action: "addAssist")

        "500"(view: '/error/error')
        "/providers/detail"(controller: "providers", action: "detail")
        "404"(view: '/error/error404')


    }
}
