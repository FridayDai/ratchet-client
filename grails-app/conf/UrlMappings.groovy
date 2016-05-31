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

        "/patients/$patientId?"(controller: "patientDashboard") {
            action = [GET: "getSinglePatient", POST: "updateSinglePatient"]
        }

        "/patients/$patientId/treatmentListTab"(controller: "patientDashboard", action: "getTreatmentListTab")
        "/patients/$patientId/reportTab"(controller: "patientDashboard", action: "getReportTab")
        "/patients/$patientId/groupTab"(controller: "patientDashboard", action: "getGroupTab")
        "/patients/$patientId/caregiverTab"(controller: "patientDashboard", action: "getCaregiverTab")
        "/patients/$patientId/activitiesTab"(controller: "patientDashboard", action: "getActivitiesTab")

        "/patients/bulk-import/sample-download"(controller: "patients", action: "downloadFile")
        "/patients/bulk-import/upload"(controller: "patients", action: "uploadFile")
        "/patients/bulk-import/lookup"(controller: "patients", action: "lookup")
        "/patients/bulk-import/save"(controller: "patients", action: "savePatients")
        "/patients/bulk-import/download-errors"(controller: "patients", action: "downloadErrors")

        "/patients/$patientId?/has-active-tasks"(controller: "patientDashboard", action: "hasActiveTasks")
        "/patients/$id?/invite"(controller: "patientDashboard", action: "invitePatient")
        "/patients/check-id"(controller: "patientDashboard", action: "checkPatientExist")
        "/patients/check-email"(controller: "patientDashboard", action: "checkPatientEmailExist")
        "/patients/$id?/delete"(controller: "patientDashboard", action: "deletePatient")
        "/patients/$patientId/notify"(controller: "patientDashboard", action: "notifyTasks")
        "/patients/$patientId/in-clinic/code"(controller: "patientDashboard", action: "getInClinicCode")

        "/patients/$patientId?/treatments"(controller: "treatment", action: "assignTreatment")
        "/patients/$patientId?/absolute-event-time/$medicalRecordId?/$absoluteEventTimestamp?"(controller: "treatment", action: "updateEventTime")
        "/patients/$patientId?/records/$medicalRecordId?/archived"(controller: "treatment", action: "archived")

        //Patient treatment
        "/patients/$patientId?/getTreatmentTab"(controller: "treatment", action: "getTreatmentTab")
        "/treatments"(controller: "treatment", action: "getTreatments")
        "/treatments/$treatmentId?"(controller: "treatment", action: "getTreatmentInfo")
        "/treatments/$treatmentId?/available-tasks"(controller: "treatment") {
            action = [GET: "getTasksInTreatment"]
        }
        "/treatments/$treatmentId?/available-years"(controller: "treatment", action: "getTreatmentAvailableYears")

        "/patients/$patientId/treatments/$medicalRecordId/add-ad-hoc-tasks"(controller: "treatment", action: "addAdhocTasks")
        "/patients/$patientId/treatments/$medicalRecordId/delete"(controller: "treatment", action: "deleteTreatment")

        //Patient task
//        "/patients/$patientId/treatments/$medicalRecordId/tasks"(controller: "task", action: "getTasks")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/send-mail"(controller: "task", action: "sendTaskEmail")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/result"(controller: "task", action: "getTaskResult")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/delete"(controller: "task", action: "deleteTask")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/voice-call"(controller: "task", action: "callVoiceTask")
        "/patients/$patientId/treatments/$medicalRecordId/task/$taskId/attention/resolve"(controller: "task", action: "resolveVoiceTask")

        //Patient caregiver
        "/patients/$patientId?/caregivers"(controller: "caregiver") {
            action = [GET: "getCaregivers", POST: "addCaregiver"]
        }
        "/patients/$patientId?/caregivers/$caregiverId?/update"(controller: "caregiver", action: "updateCaregiver")
        "/patients/$patientId?/caregivers/$caregiverId?/delete"(controller: "caregiver", action: "deleteCaregiver")
        "/patients/$patientId?/caregivers/check-email"(controller: "caregiver", action: "checkCaregiverEmail")

        //patient group
        "/patients/$patientId/groups"(controller: "groups", action: "getPatientGroups")
        "/patients/$patientId/groups/$groupId"(controller: "groups", action: "deletePatientGroup")

        //Patient report
        "/patients/$patientId?/tools/$baseToolId/report"(controller: "report", action: "getIndividualReport")
        "/patients/$patientId?/tools"(controller: "report", action: "getPatientTools")

        //Patient activity
        "/patients/$patientId?/activities"(controller: "patientDashboard", action: "getPatientActivities")

        //Accounts
        "/accounts"(controller: "accounts") {
            action = [GET: "getAccounts", POST: "addAccount"]
        }

        "/accounts/$accountId?"(controller: "accounts") {
            action = [GET: "getSingleAccount", POST: "updateAccount"]
        }

        "/accounts/$accountId?/invite"(controller: "accounts", action: "inviteAccount")
        "/accounts/$accountId?/activate"(controller: "accounts", action: "activateAccount")
        "/accounts/$accountId?/deactivate"(controller: "accounts", action: "deactivateAccount")
        "/accounts/$accountId?/groups"(controller: "groups", action: "getStaffGroups")
        "/accounts/check-email"(controller: "accounts", action: "checkAccountEmail")
        "/accounts/check-npi"(controller: "accounts", action: "checkAccountNPI")

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
        "/groups/$groupId"(controller: "groups", action: "updateGroup")
        "/groups/delete"(controller: "groups", action: "deleteGroup")

        // announcement
        "/announcement/close"(controller: "announcement", action: "close")

        // report
        "/reports/outcome"(controller: "report") {
            action = [GET: "getOutcomePage"]
        }
        "/reports/outcome/provider-average"(controller: "report") {
            action = [POST: "getProviderAverageOverview"]
        }
        "/reports/task-completion"(controller: "report") {
            action = [GET: "renderTaskCompletionReport"]
        }
        "/reports/conversion"(controller: 'report', action: "updateTaskCompletionReport")

        // Help
        "/assist-me"(controller: "assist", action: "addAssist")

        "500"(view: '/error/error')
        "404"(view: '/error/error404')

        "/robots.txt" (view: "/robots")
        "/sitemap.xml" (view: "/sitemap")
    }
}
