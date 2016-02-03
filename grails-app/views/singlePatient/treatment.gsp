<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<div class="content">

    <div id="subTabs" class="sub-tabs">

        <div data-type="SurgeryTime"
            <g:if test="${archived == 'true'}">
                class="surgery-date disabled"
            </g:if>
            <g:else>
                class="surgery-date"
            </g:else>>
            <g:if test="${surgeryTime}">
                <span>Surgery Date:</span>
                <label class="surgery-time-picker">
                    <g:formatDate date="${surgeryTime}"
                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                  format="MMM d, yyyy"></g:formatDate>
                </label>
            </g:if>
            <g:if test="${archived == 'true'}">
                <label class="archived-treatment-title">Archived Treatment</label>
            </g:if>
        </div>

        <ul
            <g:if test="${archived == 'true'}">
                class="tab-list archived"
            </g:if>
            <g:else>
                class="tab-list"
            </g:else>>
            <li data-type="Task">
                <g:link controller="task" action="getTasks"
                        params="[clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId, archived: archived, PatientEmailStatus: PatientEmailStatus, _: System.currentTimeMillis()]">TASKS</g:link>
            </li>
            <li data-type="Team">
                <g:link controller="team" action="getTeam"
                        params="[medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId, archived: archived, _: System.currentTimeMillis()]">TEAM</g:link>
            </li>
            <li data-type="Report">
                <g:link controller="singlePatient" action="getPatientReportTab"
                        params="[treatmentId: treatmentId, medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId, archived: archived, _: System.currentTimeMillis()]">REPORT</g:link>
            </li>
            <li data-type="Activity">
                <g:link controller="activity" action="index"
                        params="[clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId, archived: archived, _: System.currentTimeMillis()]">ACTIVITIES</g:link>
            </li>
            <li data-type="Tool" id="treatment-tool" class="code-generation" data-client-id="${clientId}"
                data-patient-id="${patientId}" data-medical-record-id="${medicalRecordId}" data-treatment-id="${treatmentId}">
                <button id="addTasks"
                    <g:if test="${archived == 'true'}">
                        class="btn btn-treatment-level btn-add-task disabled" disabled="disabled"
                    </g:if>
                    <g:else>
                        class="btn btn-treatment-level btn-add-task"
                    </g:else>>
                    <span class="text-span">Add Task</span>
                </button>

                <button id="notifyTasks"
                    <g:if test="${archived == 'true'|| StatusCodeConstants.EMAIL_STATUS[PatientEmailStatus.toInteger() - 1] != 'VERIFIED'}">
                        class="btn btn-treatment-level btn-notify btn-generate-code-disabled" disabled="disabled"
                    </g:if>
                    <g:else>
                        class="btn btn-treatment-level btn-notify"
                    </g:else>>
                    <span class="text-span">Notify</span>
                </button>

                <button id="generateCode"
                    <g:if test="${archived == 'true'}">
                        class="btn btn-treatment-level btn-generate-code btn-generate-code-disabled" disabled="disabled"
                    </g:if>
                    <g:else>
                        class="btn btn-treatment-level btn-generate-code"
                    </g:else>>
                    <span class="text-span">Get Code</span>
                </button>

            </li>
            <li class="more-drop-down" id="menu">

                <button
                    <g:if test="${archived == 'true'}">
                        class="drop-down-toggle disabled btn-disabled" disabled="disabled"
                    </g:if>
                    <g:else>
                        class="drop-down-toggle"
                    </g:else>>
                    <span
                        <g:if test="${archived == 'true'}">
                            class="more-btn more-btn-disabled"
                        </g:if>
                        <g:else>
                            class="more-btn"
                        </g:else>>More</span></button>

                <div class="drop-down-lists hidden">
                    <label class="hidden-surgery-time-picker hidden">
                        <g:formatDate date="${surgeryTime}"
                                      timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                      format="MMMM d, yyyy"></g:formatDate>
                    </label>
                    <g:if test="${surgeryTime}">
                    <span <g:if test="${archived == 'true'}">
                            class="btn drop-down-list icon-edit surgeryTime-edit inline disabled" disabled="disabled"
                        </g:if>
                        <g:else>
                            class="btn drop-down-list icon-edit surgeryTime-edit inline "
                        </g:else>
                            data-patient-id="${patientId}"
                            data-client-id="${clientId}" data-treatment-id="${treatmentId}"
                            data-medical-record-id="${medicalRecordId}">
                        Edit
                    </span>
                    </g:if>
                    <span <g:if test="${archived == 'true'}">
                            class="btn drop-down-list archived-active inline disabled" disabled="disabled"
                        </g:if>
                        <g:else>
                            class="btn drop-down-list archived-active inline "
                        </g:else>
                            data-patient-id="${patientId}"
                            data-client-id="${clientId}"
                            data-medical-record-id="${medicalRecordId}">
                        Archive
                    </span>
                    <g:if test="${isAdmin.toString() == 'true'}">
                    <span class="btn drop-down-list treatment-delete inline"
                            data-patient-id="${patientId}"
                            data-client-id="${clientId}"
                            data-medical-record-id="${medicalRecordId}">
                        Delete
                    </span>
                    </g:if>
                </div>
            </li>
        </ul>

    </div>

</div>

