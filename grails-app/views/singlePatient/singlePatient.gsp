<!DOCTYPE html>
<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<g:set var="scriptPath" value="singlePatientBundle"/>
<g:set var="cssPath" value="treatment"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>${patientInfo.firstName} ${patientInfo.lastName} - Ratchet Health</title>
    </head>

    <body>
    <div class="content">

        <div class="patient-detail">

            <div class="inline info logo">
                <img class="icon inline" src="${assetPath(src: 'patient_logo.png')}"/>
            </div>

            <div class="inline">
                <div class="info first-line clear">
                    <div class="pull-left name">
                        <span class="first-name" value="${patientInfo.firstName}">${patientInfo.firstName}</span>
                        <span class="last-name" value="${patientInfo.lastName}">${patientInfo.lastName}</span>
                    </div>

                    <div class="id-info pull-left">
                        ID: <span class="id" value="${patientInfo.patientId}">${patientInfo.patientId}</span>
                    </div>
                </div>

                <div class="info number clear">
                    <div class="email patient-email pull-left" id="patientEmail"
                         value="${patientInfo.email}">${patientInfo.email}
                    </div>

                    <div class="phone pull-left" value="${patientInfo.phoneNumber}">${phoneNumber}
                    </div>
                </div>
            </div>

            <g:if test="${StatusCodeConstants.ACCOUNT_STATUS[patientInfo.status - 1] == "INVITED" || StatusCodeConstants.ACCOUNT_STATUS[patientInfo.status - 1] == "UNCONFIRMED_TO_INVITED"}">
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

            <div class="edit inline">
                <a href="#" class="btn-edit-patient" data-patient-id="${patientInfo.id}"
                   data-client-id="${patientInfo.client.id}">
                </a>
                <a href="#" class="btn-close">Close</a>
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
                    <li>
                        <g:link controller="treatment" action="index" data-id="sub${i}"
                                params="[patientId      : patientInfo.id, clientId: patientInfo.client.id,
                                         medicalRecordId: medicalRecord?.id, treatmentId: medicalRecord?.treatmentId,
                                         surgeryTime    : medicalRecord?.surgeryTime, archived: medicalRecord?.archived,
                                         treatmentCode  : medicalRecord?.treatmentCode]">
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
            <label class="lbl-group">EMAIL ADDRESS<span>*</span></label>
            <input id="email" name="email" type="email" class="input-group" placeholder="john.smith@email.com"
                   required/>
        </div>
        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </g:form>

    <g:form class="form treatment-form ui-hidden" id="treatment-form" name="treatment-form">

        <div class="form-group">
            <label class="lbl-group">GROUP<span>*</span></label>
            <input id="selectGroup" name="selectGroup" type="text" class="input-group patient-group clear"
                   placeholder="Select group" required/>
        </div>

        <div class="form-group form-provider">
            <label class="lbl-group">PROVIDER<span>*</span></label>
            <input id="selectSurgeons" name="selectSurgeons" type="text" class="required" placeholder=""
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
                   placeholder="" disabled>
        </div>

        <label class="form-group required pull-right"><span>*</span>Required field</label>


        <div class="emergency-contact-info">
            <h4>EMERGENCY CONTACT</h4>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span class="emergency-required">*</span></label>
                <input id="emergency-firstName" name="emergency-firstName" type="text"
                       class="input-group emergency-field"
                       placeholder="Grace"/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span class="emergency-required">*</span></label>
                <input id="emergency-lastName" name="emergency-lastName" type="text" class="input-group emergency-field"
                       placeholder="Smith"/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">RELATIONSHIP<span class="emergency-required">*</span></label>
                <input id="relationshipName" name="relationshipName" class="input-group emergency-field">
            </label>
            </div>

            <div class="form-group inline emr-email">
                <label class="lbl-group">EMAIL ADDRESS<span class="emergency-required">*</span></label>
                <input id="emergency-email" name="email" type="email" class="input-group emergency-field"
                       placeholder="grace@email.com"/>
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
            <input id="treatment-surgeryTime" name="treatment-surgeryTime" type="text" class="input-group surgery-time"
                   placeholder="Surgery Time" tabindex="-1" required>
        </div>
    </g:form>

    <g:form class="warn">

    </g:form>
    </body>
    </html>
</g:applyLayout>
