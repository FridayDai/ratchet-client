<!DOCTYPE html>
<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<g:set var="scriptPath" value="bundles/singlePatientBundle"/>
<g:set var="cssPath" value="treatment"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>${patientInfo.firstName} ${patientInfo.lastName} - Ratchet Health</title>
    </head>

    <body>
    <div class="content">
        <div class="patient-detail">
            <div class="info-container">
                <div class="info first-line clear">
                    <div class="pull-left name">
                        <span class="first-name" value="${patientInfo.firstName}">${patientInfo.firstName}</span>
                        <span class="last-name" value="${patientInfo.lastName}">${patientInfo.lastName}</span>
                    </div>
                    <div class="edit inline">
                        <a href="#" class="btn-edit-patient" data-patient-id="${patientInfo.id}"
                           data-client-id="${patientInfo.client.id}">
                        </a>
                        <a href="#" class="btn-close">Close</a>
                    </div>
                </div>
                <hr />
                <div class="info number clear">
                    <div class="id-info inline">
                        ID: <span class="id" value="${patientInfo.patientId}">${patientInfo.patientId}</span>
                    </div>
                    <div class="phone inline" value="${patientInfo.phoneNumber}">${phoneNumber}</div>
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
                        <span class="email-status unverified">Unverified</span>
                    </g:if>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "VERIFIED"}">
                        <span class="email-status verified">Verified</span>
                    </g:elseif>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "BOUNCED"}">
                        <span class="email-status nonexistent">Nonexistent</span>
                    </g:elseif>
                    <g:else>
                        <span class="email-status div-hidden"></span>
                    </g:else>

                    <g:if test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "UNINVITED" || StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "INVITED"}">
                        <div class="inline div-invite">
                            <button id="invitePatient" class="btn invite-patient"
                                    data-id="${patientInfo.id}">Invite Again</button>
                        </div>
                    </g:if>
                    <g:else>
                        <div class="inline div-invite invisible-invite">
                            <button class="btn btn-invite invite-patient" data-id="${patientInfo.id}">Invite Again</button>
                        </div>
                    </g:else>
                </div>
            </div>
            <input type="hidden" name="clientId" value="${patientInfo.client.id}"/>

        </div>

        <div id="tabs" class="patient-tab">
            <g:if test="${medicalRecords.size() < treatmentLimit}">
                <button id="addTab" class="btn add-tab" data-patient-id="${patientInfo.id}"
                        data-id="${patientInfo.patientId}"
                        data-client-id="${patientInfo.client.id}"
                        data-account-id="${request.session.accountId}">Add Treatment</button>
            </g:if>
            <ul class="tab-treatment">
                <g:each in="${medicalRecords}" var="medicalRecord" status="i">
                    <li
                        <g:if test="${medicalRecord?.archived}">
                            class="archived-treatment"
                        </g:if>>
                    %{--<li>--}%
                        <g:link controller="treatment" action="index" data-id="sub${i}"
                                params="[
                                        patientId      : patientInfo.id, clientId: patientInfo.client.id,
                                        medicalRecordId: medicalRecord?.id, treatmentId: medicalRecord?.treatmentId,
                                        surgeryTime    : medicalRecord?.surgeryTime, archived: medicalRecord?.archived,
                                        treatmentCode  : medicalRecord?.treatmentCode,
                                        isEmailBlank   : !patientInfo?.email
                                ]">
                            <g:if test="${medicalRecord?.archived}">
                                <i class="icon-archived"></i>
                            </g:if>
                            ${medicalRecord.title} ${medicalRecord.tmpTitle}
                        </g:link>
                    </li>
                </g:each>
            </ul>
        </div>
    </div>

    <g:form class="patient-form ui-hidden" id="patient-form" name="patient-form">
        <div class="form-group">
            <label class="lbl-group">PATIENT ID<span>*</span></label>
            <input id="patientId" name="id" type="text" class="input-group"
                   placeholder="1234567890"
                   required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">FIRST NAME<span>*</span></label>
            <input id="firstName" name="firstName" type="text" class="input-group" placeholder="John"
                   required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">LAST NAME<span>*</span></label>
            <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Smith" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">PHONE NUMBER<span>*</span></label>
            <input id="phone" name="phone" type="text" maxlength="14" class="input-group"
                   placeholder="777-777-7777" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">EMAIL ADDRESS</label>
            <input id="email" name="email" type="email" class="input-group" placeholder="john.smith@email.com (Optional)"/>
        </div>
        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </g:form>

    <g:form class="form treatment-form ui-hidden" id="treatment-form" name="treatment-form">
        <input type="hidden" autofocus/>
        <div class="form-group">
            <label class="lbl-group">GROUP<span>*</span></label>
            <input id="selectGroup" name="selectGroup" type="text" class="input-group patient-group clear"
                   placeholder="Select group" required/>
        </div>

        <div class="form-group form-provider">
            <label class="lbl-group">PROVIDER<span>*</span></label>
            <input id="selectSurgeons" name="selectSurgeons" type="text" class="required" placeholder="Select provider"
                   disabled/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">TREATMENT<span>*</span></label>
            <input id="selectTreatment" name="selectTreatment" type="text" class=" required"
                   placeholder="Select treatment"/>
        </div>

    %{--<div class="form-group div-hidden" id="div-surgery-time">--}%
        <div class="form-group inline">
            <label class="lbl-group">SURGERY DATE<span>*</span></label>
            <input id="surgeryTime" name="surgeryTime" type="text" class="input-group surgery-time required"
                   placeholder="Select surgery date" disabled>
        </div>

        <div class="emergency-contact-info">
            <h4>EMERGENCY CONTACT</h4>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span class="emergency-required">*</span></label>
                <input id="emergency-firstName" name="emergency-firstName" type="text"
                       class="input-group emergency-field"
                       placeholder="Grace (Optional)"/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span class="emergency-required">*</span></label>
                <input id="emergency-lastName" name="emergency-lastName" type="text" class="input-group emergency-field"
                       placeholder="Smith (Optional)"/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">RELATIONSHIP<span class="emergency-required">*</span></label>
                <input id="relationshipName" name="relationshipName" class="input-group emergency-field"
                       placeholder="Select relationship">
            </label>
            </div>

            <div class="form-group inline emr-email">
                <label class="lbl-group">EMAIL ADDRESS<span class="emergency-required">*</span></label>
                <input id="emergency-email" name="email" type="email" class="input-group emergency-field"
                       placeholder="grace@email.com (Optional)"/>
            </div>

            <div class="form-group inline permission-confirm">
                <label></label>
                <input type="checkbox" name="permissionConfirm" class="permission-confirm-check"/>*
                <span>Patient would like to release his/her health information to
                    <span id="ec-first-name"></span>.</span>
            </div>
        </div>
        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </g:form>

    <g:form class="treatment-time-form ui-hidden" id="treatment-time-form" name="treatment-time-form">
        <div class="form-group inline ">
            <label class="lbl-group">SURGERY DATE</label>
            <input id="treatment-surgeryTime" name="treatment-surgeryTime" type="text"
                   class="input-group surgery-time"
                   placeholder="Select surgery date"
                   tabindex="-1"
                   required>
        </div>
    </g:form>

    <g:form class="add-email-form ui-hidden" name="add-email-form">
        <div class="form-group description">
            There is no email address for this patient. Do you want to add an email address?
        </div>
        <div class="form-group email-group">
            <label class="lbl-group">EMAIL ADDRESS</label>
            <input id="add-email-field" name="email" type="text"
                   class="input-group"
                   placeholder="john.smith@email.com (Optional)"
                   tabindex="-1">
        </div>
    </g:form>

    <g:form class="warn">

    </g:form>

    <g:form class="generate-code-form warn ui-hidden">

    </g:form>
    </body>
    </html>
</g:applyLayout>
