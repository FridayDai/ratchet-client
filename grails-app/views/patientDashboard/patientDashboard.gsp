<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<%@ page import="com.ratchethealth.client.Utils" %>

<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/patientDashboard.bundle.js"/>
<g:set var="cssPath" value="patientDashboard"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>${patientInfo.firstName} ${patientInfo.lastName} - Ratchet Health</title>
    </head>

    <body>
    <div class="content">
        <div class="patient-detail" data-account-is-admin="${AccountIsAdmin}">
            <div class="info-container">
                <div class="info first-line clear">
                    <div class="pull-left name">
                        <g:if test="${patientInfo.gender == "MALE"}">
                            <span id="header-portrait" class="portrait-male"></span>
                        </g:if>
                        <g:elseif test="${patientInfo.gender == "FEMALE"}">
                            <span id="header-portrait" class="portrait-female"></span>
                        </g:elseif>
                        <g:else>
                            <span id="header-portrait"></span>
                        </g:else>

                        <span class="first-name" value="${patientInfo.firstName}">${patientInfo.firstName}</span>
                        <span class="last-name" value="${patientInfo.lastName}">${patientInfo.lastName}</span>
                    </div>

                    <div class="edit inline">
                        <a href="#" class="btn-edit-patient" data-patient-id="${patientInfo.id}"
                           data-client-id="${patientInfo.client.id}" data-email-status="${patientInfo.status}"
                        data-gender="${patientInfo.gender}">
                        </a>
                        <a href="#" class="btn-close">Close</a>
                    </div>
                </div>

                <div class="info number clear">
                    <div class="id-info inline">
                        <i class="id-text">ID</i><span class="identify"
                                                       value="${patientInfo.patientId}">${patientInfo.patientId}</span>
                    </div>

                    <div class="birthday inline <g:if test="${!patientInfo?.birthday}">hide</g:if>">
                        <i class="fa fa-birthday-cake"></i><span>${Utils.formatBirthday(patientInfo?.birthday)}</span>
                    </div>

                    <div class="phone inline">${phoneNumber}</div>
                    <g:if test="${!phoneNumber}">
                        <a href="#" class="add-phone-number">Add Phone Number</a>
                    </g:if>
                    <g:else>
                        <a href="#" class="add-phone-number div-hidden">Add Phone Number</a>
                    </g:else>

                    <div class="email patient-email inline" id="patientEmail"
                         value="${patientInfo.email}">${patientInfo.email}
                    </div>
                    <g:if test="${!patientInfo.email}">
                        <a href="#" class="add-email">Add Email</a>
                    </g:if>
                    <g:else>
                        <a href="#" class="add-email div-hidden">Add Email</a>
                    </g:else>

                    <g:if test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "UNINVITED" || StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "INVITED"}">
                        <i class="email-state-icon fa email-state-icon-unverified" aria-hidden="true"></i><span class="email-state " data-email-status="${patientInfo.status}">UNVERIFIED</span>
                    </g:if>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "VERIFIED"}">
                        <i class="email-state-icon fa email-state-icon-verified" aria-hidden="true"></i><span class="email-state " deat-email-status="${patientInfo.status}">VERIFIED</span>
                    </g:elseif>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "BOUNCED"}">
                        <i class="email-state-icon fa email-state-icon-nonexistent" aria-hidden="true"></i><span class="email-state " data-email-status="${patientInfo.status}">UNDELIVERABLE</span>
                    </g:elseif>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "DECLINED"}">
                        <i class="email-state-icon fa email-state-icon-declined" aria-hidden="true"></i><span class="email-state " data-email-status="${patientInfo.status}">DECLINED</span>
                    </g:elseif>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "NOT INVITED"}">
                        <i class="email-state-icon fa email-state-icon-unverified hidden" aria-hidden="true"></i><span class="email-state " data-email-status="${patientInfo.status}">NOT INVITED</span>
                    </g:elseif>
                    <g:else>
                        <i class="email-state-icon fa email-state-icon-unverified div-hidden" aria-hidden="true"></i><span class="email-state div-hidden" data-email-status="${patientInfo.status}"></span>
                    </g:else>

                    <g:if test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "UNINVITED" || StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "INVITED"}">
                        <div class="inline div-invite">
                            <button id="invitePatient" class="btn invite-patient"
                                    data-patient-id="${patientInfo.id}">Invite Again</button>
                        </div>
                    </g:if>
                    <g:else>
                        <div class="inline div-invite invisible-invite">
                            <button class="btn btn-invite invite-patient"
                                    data-patient-id="${patientInfo.id}">Invite Again</button>
                        </div>
                    </g:else>
                </div>
            </div>
            <input type="hidden" name="clientId" value="${patientInfo.client.id}"/>

        </div>

        <div id="top-tabs" class="top-tabs-container hide">
            <ul class="top-tab-list">
                <li data-type="Treatment">
                    <g:link controller="patientDashboard"
                            action="getTreatmentListTab"
                            params="[
                                    patientId         : patientInfo.id,
                                    PatientEmailStatus: patientInfo.status
                            ]">
                        TIMELINE
                    </g:link>
                </li>
                <li data-type="Report">
                    <g:link controller="patientDashboard"
                            action="getReportTab"
                            params="[
                                    patientId: patientInfo.id,
                            ]">
                        REPORT
                    </g:link>
                </li>
                <li data-type="Group">
                    <g:link controller="patientDashboard"
                            action="getGroupTab"
                            params="[
                                    patientId: patientInfo.id
                            ]">
                        GROUP
                    </g:link>
                </li>
                <li data-type="Caregiver">
                    <g:link controller="patientDashboard"
                            action="getCaregiverTab"
                            params="[
                                    patientId: patientInfo.id
                            ]">
                        CAREGIVER
                    </g:link>
                </li>
                <li data-type="Activities">
                    <g:link controller="patientDashboard"
                            action="getActivitiesTab"
                            params="[
                                    patientId: patientInfo.id
                            ]">
                        ACTIVITIES
                    </g:link>
                </li>
                <li data-type="Profile">
                    <g:link controller="patientDashboard"
                            action="getProfileTab"
                            params="[
                                    patientId: patientInfo.id
                            ]">
                        PROFILE
                    </g:link>
                </li>
            </ul>

            <div class="patient-tab-tool" data-patient-id="${patientInfo.id}">
                <span class="notify-button icon-button <g:if
                        test="${!hasActiveTasks || !patientInfo.email || StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] != "VERIFIED"}">not-available</g:if>">
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span>

                <div class="notify-button-tip icon-button-tip begin-tip">
                    <span>Notify</span>
                </div>

                <span class="get-code-button icon-button <g:if test="${!hasActiveTasks}">not-available</g:if>">
                    <i class="fa fa-link" aria-hidden="true"></i>
                </span>

                <div class="get-code-button-tip icon-button-tip begin-tip">
                    <span>Get Code</span>
                </div>
            </div>
        </div>
    </div>

    <form action="/patients/${patientInfo.id}" method="post" class="patient-form ui-hidden" id="patient-form">
        <div class="form-group">
            <label class="lbl-group">PATIENT ID<span>*</span></label>
            <input id="identify" name="identify" type="text" class="input-group"
                   placeholder="1234567890"
                   required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">FIRST NAME<span>*</span></label>
            <input id="firstName" name="firstName" type="text" class="input-group" placeholder="John"
                   required autofocus="autofocus"/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">LAST NAME<span>*</span></label>
            <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Smith" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">BIRTHDAY<span>*</span></label>
            <input id="birthday" name="birthday" type="text" class="input-group birthday re-position"
                   placeholder="MM/DD/YYYY" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">GENDER</label>
            <input id="gender" name="gender" type="text" class="input-group input-convert"
                   placeholder="Unspecified (Optional)"/>
        </div>

        <div class="form-group inline phone-block">
            <label class="lbl-group">PHONE NUMBER</label>
            <input id="phone" name="phoneNumberVal" type="text" maxlength="14" class="input-group"
                   placeholder="777-777-7777 (Optional)"/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">EMAIL ADDRESS</label>
            <input id="email" name="email" type="email" class="input-group" placeholder="john.smith@email.com (Optional)"/>
            <div class="decline">
                <input id="emailStatus" name="emailStatus" type="checkbox" value="decline">
                <label for="emailStatus" class="decline-msg">
                    <span>Patient declined to communicate via email.</span>
                    <span class="warn-msg">(Warning: This cannot be undone.)</span>
                </label>
            </div>
        </div>

        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </form>

    <form action="/patients/${patientInfo.id}/treatments" method="post" class="form treatment-form ui-hidden"
          id="treatment-form">
        <input type="hidden" autofocus/>

        <div class="form-group">
            <label class="lbl-group">GROUP<span>*</span></label>
            <input id="selectGroup" name="groupVal" type="text" class="input-group patient-group clear"
                   placeholder="Select group" required/>
        </div>

        <div class="form-group form-provider">
            <label class="lbl-group">PROVIDER<span>*</span></label>
            <input id="selectSurgeons" name="staffVal" type="text" class="required"
                   placeholder="Select provider" disabled/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">TREATMENT<span>*</span></label>
            <input id="selectTreatment" name="treatmentVal" type="text" class="required"
                   placeholder="Select treatment" disabled/>
        </div>

        <div class="form-group inline" id="treatment-date-group">
            <label class="lbl-group">SURGERY DATE<span>*</span></label>
            <input id="eventTime" name="eventTimeStr" type="text" class="date-time-picker event-time required"
                   placeholder="Select surgery date" disabled>
        </div>

        <div class="caregiver-info">
            <h4>CAREGIVER</h4>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span class="caregiver-required">*</span></label>
                <input id="caregiver-firstName" name="ecFirstName" type="text"
                       class="input-group caregiver-field"
                       placeholder="Grace (Optional)"/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span class="caregiver-required">*</span></label>
                <input id="caregiver-lastName" name="ecLastName" type="text" class="input-group caregiver-field"
                       placeholder="Smith (Optional)"/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">RELATIONSHIP<span class="caregiver-required">*</span></label>
                <input id="relationship" name="relationshipVal" class="input-group caregiver-field"
                       placeholder="Spouse (Optional)">
            </div>

            <div class="form-group inline emr-email">
                <label class="lbl-group">EMAIL ADDRESS<span class="caregiver-required">*</span></label>
                <input id="caregiver-email" name="ecEmail" type="email" class="input-group caregiver-field"
                       placeholder="grace@email.com (Optional)"/>
            </div>

            <div class="form-group inline permission-confirm">
                <input type="checkbox" name="permissionConfirm" id="permission-confirm-check"
                       class="permission-confirm-check"/>
                <label for="permission-confirm-check">*Patient would like to release his/her health information to
                    <span id="ec-first-name"></span>.</label>
            </div>
        </div>
        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </form>

    <form action="" method="post" class="form ui-hidden add-tasks-dialog" id="add-tasks-dialog">
        <input type="hidden" autofocus/>

        <div class="has-tasks">
            <div class="section section-1">
                <div class="section-desc">Select a tool or tools from the list below</div>
                <button class="btn select-all">Select all</button>
                <ul class="task-list"></ul>
            </div>
        </div>

        <div class="no-tasks">
            <div class="icon"></div>
            <div class="title">No tools available</div>
            <div class="description">There are no tools available for this<br/>treatment yet</div>
        </div>

        <div class="section section-2">
            <div class="section-desc">Select when you would like the task(s) to become active</div>

            <div class="form-group schedule-date-group">
                <label class="lbl-group">SCHEDULE TASK(S)</label>
                <input name="scheduleTaskDate" type="text" class="date-picker" placeholder="Select date"
                       required>

                <div class="surgery-date-relative-indicator"></div>
            </div>

            <div class="form-group form-provider">
                <label class="lbl-group">PROVIDER<span>*</span></label>
                <input id="selectAddTaskProvider" name="staffVal" type="text" class="required"
                       placeholder="Select provider"/>
            </div>
        </div>
    </form>

    <form action="" method="post" class="treatment-time-form ui-hidden" id="treatment-time-form">
        <div class="form-group inline">
            <label class="lbl-group">SURGERY DATE<span>*</span></label>
            <input id="treatment-eventTime" name="treatment-eventTime" type="text"
                   class="date-time-picker event-time"
                   placeholder="Select surgery date"
                   tabindex="-1"
                   required>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">PROVIDER<span>*</span></label>
            <input id="treatment-provider" name="staffVal" type="text"
                   class="input-group"
                   placeholder="Select provider"
                   tabindex="-1"
                   required/>
        </div>
    </form>

    <form action="/patients/${patientInfo.id}" method="post" class="add-email-form ui-hidden" id="add-email-form">
        <div class="form-group description">
            There is no email address for this patient. Do you want to add an email address?
        </div>

        <div class="form-group email-group">
            <label class="lbl-group">EMAIL ADDRESS</label>
            <input id="add-email-field" name="email" type="text"
                   class="input-group"
                   placeholder="john.smith@email.com" required>
        </div>
    </form>

    <form action="/patients/${patientInfo.id}" method="post" class="add-phone-number-form ui-hidden"
          id="add-phone-number-form">
        <div class="form-group description">
            There is no phone number for this patient. Do you want to add a phone number?
        </div>

        <div class="form-group email-group">
            <label class="lbl-group">PHONE NUMBER</label>
            <input id="add-phone-number-field" name="phoneNumberVal" type="text" maxlength="14" class="input-group"
                   placeholder="777-777-7777" required/>
        </div>
    </form>

    <form action="/patients/${patientInfo.id}/delete" method="post" class="delete-patient-form ui-hidden"
          id="delete-patient-form">
        <div class="form-group description">
            In order to permanently remove the patient, please type "<strong>DELETE</strong>" in the textbox below.
        </div>

        <div class="form-group email-group">
            <label class="lbl-group">TYPE DELETE</label>
            <input id="delete-patient-field" name="deleteField" type="text"
                   class="input-group" required/>
        </div>
    </form>

    <form action="/patients/${patientInfo.id}/treatments/" method="post" class="delete-treatment-form ui-hidden"
          id="delete-treatment-form">
        <div class="form-group description">
            In order to permanently remove the treatment, please type "<strong>DELETE</strong>" in the textbox below.
        </div>

        <div class="form-group email-group">
            <label class="lbl-group">TYPE DELETE</label>
            <input id="delete-treatment-field" name="deleteField" type="text"
                   class="input-group" required/>
        </div>
    </form>

    <form action="" class="fill-questionnaire-dialog ui-hidden" id="fill-questionnaire-dialog">
        <div class="form-group description">
            When did the patient fill the questionnaire?
        </div>

        <div class="form-group email-group">
            <input type="hidden" autofocus/>
            <label class="lbl-group">DATE</label>
            <input id="fill-questionnaire-date-field" type="text" class="date-picker"
                   placeholder="Jan 31, 2015" autocomplete="off" required>
        </div>
    </form>

    <form action="" method="post" class="inviteGiverForm ui-hidden" id="invite-caregiver-form">
        <div class="form-group inline">
            <label class="lbl-group">FIRST NAME<span>*</span></label>
            <input id="giver-firstName" name="firstName" type="text" class="input-group"
                   placeholder="Grace"
                   required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">LAST NAME<span>*</span></label>
            <input id="giver-lastName" name="lastName" type="text" class="input-group"
                   placeholder="Smith" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">RELATIONSHIP<span>*</span></label>
            <input id="relationships" name="relationships" class="select-body input-group"
                   placeholder="Spouse" required>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">EMAIL ADDRESS<span>*</span></label>
            <input id="giver-email" name="email" type="email" class="input-group"
                   placeholder="grace@email.com" required/>
        </div>

        <div class="form-group inline team-permission-confirm">
            <input type="checkbox" id="permissionConfirm" name="permissionConfirm" required/>
            <label for="permissionConfirm">*Patient would like to release his/her health information to the caregiver.</label>
        </div>
        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </form>

    <g:form controller="groups" action="addGroupsToPatient" method="POST" class="form add-group-form ui-hidden"
            id="add-group-form" name="add-group-form">

        <div class="title">
            Select a group or multiple groups from the list:
        </div>

        <div class="form-group">
            <label class="lbl-group">GROUPS</label>
            <input id="groups" name="groups" type="text" class="plugin-select-box input-group groups clear"
                   maxlength="1024"
                   placeholder="Select group" multiple="multiple" required/>
        </div>

        <input type="hidden" name="patientId" value="${patientInfo.id}">
    </g:form>

    <g:form controller="task" action="completeUserToolTask" method="POST" class="form add-group-form answer-discharge-form ui-hidden"
            id="answer-discharge-task" name="answer-discharge-task">

        <div class="title">
            Please pick the discharge location:
        </div>

        <ul class="list">
            <li class="answer">
                <label class="choice">
                    <input type="radio" class="rc-choice-hidden " name="choice.question1" value="1">
                    <span class="rc-radio primary-radio-color"></span>
                </label>

                <div class="text">Home</div>
            </li>
            <li class="answer">
                <label class="choice">
                    <input type="radio" class="rc-choice-hidden" name="choice.question1" value="2">
                    <span class="rc-radio primary-radio-color"></span>
                </label>

                <div class="text">Home with support</div>
            </li>
            <li class="answer">
                <label class="choice">
                    <input type="radio" class="rc-choice-hidden" name="choice.question1" value="3">
                    <span class="rc-radio primary-radio-color"></span>
                </label>

                <div class="text">SNF</div>
            </li>
        </ul>

        <input type="hidden" name="patientId" value="${patientInfo.id}">
    </g:form>

    <g:form controller="task" action="completeUserToolTask" method="POST" class="form add-group-form answer-snf-form ui-hidden"
            id="answer-snf-task" name="answer-snf-task">

        <div class="title">
            Q1. Have you received the patient’s report from the SNF?
        </div>

        <ul class="list">
            <li class="answer">
                <label class="choice">
                    <input type="radio" class="rc-choice-hidden " name="choice.question1" value="1">
                    <span class="rc-radio primary-radio-color"></span>
                </label>

                <div class="text">YES</div>
            </li>
            <li class="answer">
                <label class="choice">
                    <input type="radio" class="rc-choice-hidden" name="choice.question1" value="2">
                    <span class="rc-radio primary-radio-color"></span>
                </label>

                <div class="text">No</div>
            </li>
        </ul>

        <div class="title">
            Q2. What is the patient’s expected LOS at the SNF?
        </div>

        <div class="list">
            <label class="expected-label">
                <input type="text" class="hidden" autofocus>
                <input type="text" class="input-text" name="choice.question2" maxlength="2"/>
                <span>Day(s)</span>
            </label>
        </div>

        <input type="hidden" name="patientId" value="${patientInfo.id}">
    </g:form>

    <div id="generate-code-dialog" class="warn ui-hidden">
        <div class="msg-center msg-header">
            To get the patient to complete the active tasks in clinic,
            go to <a target="_blank" class="link-to-patient" href=""></a> and enter the following
        code on a device that the patient has access to.
        </div>

        <div class="msg-center code"></div>

        <div class="msg-center">The code will expire in 48 hours!</div>
    </div>
    </body>
    </html>
</g:applyLayout>
